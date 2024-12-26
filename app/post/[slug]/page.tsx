import { GetPostQuery } from '@/gql/graphql';
import getPost from '@/lib/wordpress/getPost';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PostComment } from '@/components/PostComment';

type CommentsType = NonNullable<
	NonNullable<GetPostQuery['post']>['comments']
>['nodes'];

export default async function Post({
	params
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const response = await getPost({ params: { id: slug } });
	if (!response.success) {
		return <div>Error while fetching post</div>;
	}
	const post = response.data.post;
	if (!post) {
		return <div>Post not found</div>;
	}
	return (
		<main className="container mx-auto grid max-w-[800px] grid-cols-1 place-items-start gap-6 px-4 py-8">
			<h1 className="text-4xl font-bold">{post.title}</h1>
			<div className="h-[300px] w-full">
				<Image
					src={
						post.featuredImage?.node.mediaItemUrl ||
						'https://via.placeholder.com/300x200'
					}
					alt={
						post.featuredImage?.node.caption || post.title || 'Featured Image'
					}
					width={300}
					height={300}
					className="h-full w-full rounded-lg object-cover"
				/>
			</div>
			<div className="mt-auto text-gray-500">
				By {post.author?.node.name} on{' '}
				{new Date(post.date || '').toLocaleDateString()}
			</div>
			<article
				className="prose min-h-[300px] max-w-full pb-32 lg:prose-lg prose-img:rounded prose-img:border-2 prose-img:border-black"
				// TODO: Figure out if this is safe or not
				dangerouslySetInnerHTML={{
					__html: post.content || ''
				}}
			></article>
			<div className="flex w-full flex-col gap-5 border-t border-gray-200 pt-4">
				<h2 className="text-xl font-bold text-gray-600">
					Comments ({post.commentCount || 0})
				</h2>
				<PostComment id={Number(post.databaseId)} />
				<Comments comments={post.comments?.nodes || []} />
			</div>
		</main>
	);
}

function Comments({ comments }: { comments: CommentsType }) {
	return (
		<div className="mt-auto flex flex-col gap-5 text-gray-500">
			{comments.map((comment) => (
				<div
					key={comment.date}
					className="flex flex-col gap-2 rounded border border-gray-200 p-5"
				>
					<div className="flex items-center gap-2">
						<Avatar>
							<AvatarImage
								src={`https://api.dicebear.com/6.x/bottts/svg?seed=${comment.author?.name}`}
							/>
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div className="mb-2 text-gray-600">
							By {comment.author?.name} on{' '}
							{new Date(comment.date || '').toLocaleDateString()}
						</div>
					</div>
					<div key={comment.date}>
						<div
							className="prose prose-base max-w-full"
							// TODO: Figure out if this is safe or not
							dangerouslySetInnerHTML={{
								__html: comment.content || ''
							}}
						></div>
					</div>
				</div>
			))}
		</div>
	);
}
