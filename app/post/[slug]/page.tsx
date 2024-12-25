import getPost from '@/lib/wordpress/getPost';
import Image from 'next/image';

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
				className="prose lg:prose-lg max-w-full"
				// TODO: Figure out if this is safe or not
				dangerouslySetInnerHTML={{
					__html: post.content || ''
				}}
			></article>
		</main>
	);
}
