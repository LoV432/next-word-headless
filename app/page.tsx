import { getAllPosts } from '@/lib/wordpress/getAllPosts';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
	const response = await getAllPosts({
		first: 5
	});
	if (!response.success) {
		return <div>Error while fetching posts</div>;
	}
	const posts = response.data;
	return (
		<main className="container mx-auto px-4 py-8">
			<h1 className="mb-8 text-3xl font-bold">Latest Posts</h1>
			<div className="grid grid-cols-1 place-items-center gap-6">
				{posts.posts?.edges.map(({ node: post }) => (
					<div
						key={post.id}
						className="relative flex w-full max-w-[300px] flex-col rounded-lg bg-white shadow-md duration-200 hover:translate-y-[-4px] sm:max-w-[800px] sm:flex-row"
					>
						<Image
							src={
								post.featuredImage?.node.mediaItemUrl ||
								'https://via.placeholder.com/300x200'
							}
							alt={
								post.featuredImage?.node.caption ||
								post.title ||
								'Featured Image'
							}
							width={300}
							height={200}
							className="h-full w-full object-cover sm:h-48 sm:w-48"
						/>
						<div className="flex flex-col p-4">
							<h2 className="mb-2 text-xl font-semibold">
								<Link
									href={`/post/${post.slug}`}
									className="text-blue-600 before:absolute before:left-0 before:top-0 before:h-full before:w-full hover:text-blue-800"
								>
									{post.title}
								</Link>
							</h2>
							<div
								className="mb-4 text-gray-600"
								// TODO: Figure out if this is safe or not
								dangerouslySetInnerHTML={{
									__html: post.excerpt || ''
								}}
							></div>
							<div className="mt-auto text-sm text-gray-500">
								By {post.author?.node.name} on{' '}
								{new Date(post.date || '').toLocaleDateString()}
							</div>
						</div>
					</div>
				))}
			</div>
		</main>
	);
}
