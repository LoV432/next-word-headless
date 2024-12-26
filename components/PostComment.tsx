'use client';
import { Button } from '@/components/ui/button';
import { FormEvent, useState } from 'react';
import postComment from '@/lib/wordpress/postComment';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function PostComment({ id }: { id: number }) {
	const [comment, setComment] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isPosted, setIsPosted] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	function reset() {
		setComment('');
		setName('');
		setEmail('');
		setError(null);
		setIsPosted(false);
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
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
				setIsPosted(true);
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
							id="comment"
							rows={5}
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							placeholder="Your raw and beautiful comment"
						/>
					</div>
					<div className="mt-auto flex justify-end gap-2">
						<Button
							type="submit"
							disabled={isLoading}
							className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							{isLoading ? 'Loading...' : 'Post'}
						</Button>
						<Button
							type="button"
							onClick={reset}
							className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							Reset
						</Button>
					</div>
					{error && <div className="text-red-500">{error.message}</div>}
					{isPosted && (
						<div className="text-green-500">
							Comment received. Moderator will review it shortly.
						</div>
					)}
				</div>
			</form>
		</div>
	);
}
