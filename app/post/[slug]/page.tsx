import { GetPostQuery } from '@/gql/graphql';
import getPost from '@/lib/wordpress/getPost';
import Image from 'next/image';

type CommentsType = NonNullable<
	NonNullable<GetPostQuery['post']>['comments']
>['nodes'];

export default async function Post({ params }: { params: { slug: string } }) {
	const response = await getPost({ params: { id: params.slug } });
	if (!response.success) {
		return <div>Error while fetching post</div>;
	}
	const post = response.data.post;
	if (!post) {
		return <div>Post not found</div>;
	}
	return (
		<main className="container mx-auto grid max-w-[800px] grid-cols-1 place-items-start gap-6 px-4 py-8">
			<h1 className="text-3xl font-bold">{post.title}</h1>
			<div className="max-h-[300px] w-full overflow-hidden rounded-lg">
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
					className="h-full w-full object-cover"
				/>
			</div>
			<div className="mt-auto text-gray-500">
				By {post.author?.node.name} on{' '}
				{new Date(post.date || '').toLocaleDateString()}
			</div>
			<article
				className="prose lg:prose-lg min-h-[300px] max-w-full"
				// TODO: Figure out if this is safe or not
				dangerouslySetInnerHTML={{
					__html: post.content || ''
				}}
			></article>
			<div className="flex w-full flex-col gap-5 border-t border-gray-200 pt-4">
				<h2 className="text-xl font-bold">
					Comments ({post.commentCount || 0})
				</h2>
				<Comments comments={post.comments?.nodes || []} />
			</div>
		</main>
	);
}

function Comments({ comments }: { comments: CommentsType }) {
	return (
		<div className="mt-auto text-sm text-gray-500">
			{comments.map((comment) => (
				<div
					key={comment.date}
					className="rounded border border-gray-200 p-5 pb-4"
				>
					<div className="mb-2 text-gray-600">
						By {comment.author?.name} on{' '}
						{new Date(comment.date || '').toLocaleDateString()}
					</div>
					<div
						className="prose lg:prose-lg max-w-full"
						// TODO: Figure out if this is safe or not
						dangerouslySetInnerHTML={{
							__html: comment.content || ''
						}}
					></div>
				</div>
			))}
		</div>
	);
}
