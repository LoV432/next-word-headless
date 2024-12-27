'use client';
import { Button } from '@/components/ui/button';
import { FormEvent, useState } from 'react';
import postComment from '@/lib/wordpress/postComment';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function PostComment({ id }: { id: number }) {
	const [comment, setComment] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [unapprovedComments, setUnapprovedComments] = useState<
		{
			author: string;
			content: string;
		}[]
	>([]);

	function reset() {
		setComment('');
		setName('');
		setEmail('');
		setError(null);
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!name || !email || !comment) {
			return;
		}
		setIsLoading(true);
		try {
			const response = await postComment({
				params: {
					author: name,
					authorEmail: email,
					commentOn: id,
					content: comment
				}
			});
			if (response.success) {
				reset();
				setUnapprovedComments((comments) => [
					{ author: name, content: comment },
					...comments
				]);
			} else {
				setError(new Error('Something went wrong'));
			}
		} catch (error) {
			setError(new Error('Something went wrong'));
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<div className="flex w-full flex-col gap-5 pt-4">
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-2">
						<label
							htmlFor="name"
							className="mb-2 text-sm font-medium text-gray-900"
						>
							Name
						</label>
						<Input
							minLength={2}
							required
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Display Name"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label
							htmlFor="email"
							className="mb-2 text-sm font-medium text-gray-900"
						>
							Email
						</label>
						<Input
							minLength={3}
							required
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label
							htmlFor="comment"
							className="mb-2 text-sm font-medium text-gray-900"
						>
							Comment
						</label>
						<Textarea
							minLength={3}
							required
							id="comment"
							rows={5}
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							placeholder="Your raw and beautiful comment"
						/>
					</div>
					<div className="mt-auto flex w-full gap-2">
						<div className="justify-self-start">
							{error && <div className="text-red-500">{error.message}</div>}
						</div>
						<Button
							type="submit"
							disabled={isLoading}
							className="ml-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							{isLoading ? 'Loading...' : 'Post'}
						</Button>
						<Button
							type="button"
							onClick={reset}
							className="justify-end rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							Reset
						</Button>
					</div>
				</div>
			</form>
			<FakeComments comments={unapprovedComments} />
		</div>
	);
}

function FakeComments({
	comments
}: {
	comments: { author: string; content: string }[];
}) {
	return (
		<div className="mt-auto flex flex-col gap-5 text-gray-500">
			{comments.map((comment) => (
				<div
					key={comment.content}
					className="flex flex-col gap-2 rounded border border-gray-200 p-5 opacity-70"
				>
					<div className="flex items-center gap-2">
						<Avatar>
							<AvatarImage
								src={`https://api.dicebear.com/6.x/bottts/svg?seed=${comment.author}`}
							/>
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div className="mb-2 text-gray-600">
							By {comment.author} on {new Date().toLocaleDateString()}
						</div>
					</div>
					<div className="italic text-gray-500">
						This comment is pending approval and will be visible to others once
						approved.
					</div>
					<div>
						<div className="prose prose-base max-w-full">{comment.content}</div>
					</div>
				</div>
			))}
		</div>
	);
}
