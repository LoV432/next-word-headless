import { getAllPosts } from '@/lib/wordpress/getAllPosts';
import { GetAllPostsQuery } from '@/gql/graphql';
import Image from 'next/image';
import Link from 'next/link';
import handlePaginationParams from '@/lib/handlePaginationParams';

type Post = NonNullable<GetAllPostsQuery['posts']>['edges'][0]['node'];
type PageInfo = NonNullable<GetAllPostsQuery['posts']>['pageInfo'];

export default async function Home({
	searchParams
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	const params = await searchParams;
	const queryPaginationParams = handlePaginationParams(params);
	const response = await getAllPosts(queryPaginationParams);
	if (!response.success) {
		return <div>Error while fetching posts</div>;
	}
	const posts = response.data;
	return (
		<main className="container mx-auto px-4 py-8">
			<h1 className="mb-8 text-3xl font-bold">Latest Posts</h1>
			<div className="grid grid-cols-1 place-items-center gap-6">
				{posts.posts?.edges?.map(({ node }) => (
					<PostCard key={node.id} post={node} />
				))}
			</div>
			{posts.posts?.pageInfo && <Pagination pageInfo={posts.posts.pageInfo} />}
		</main>
	);
}

function PostCard({ post }: { post: Post }) {
	return (
		<div className="relative flex w-full max-w-[300px] flex-col rounded-lg bg-white shadow-md duration-200 hover:translate-y-[-4px] sm:max-w-[800px] sm:flex-row">
			<Image
				src={
					post.featuredImage?.node.mediaItemUrl ||
					'https://via.placeholder.com/300x200'
				}
				alt={post.featuredImage?.node.caption || post.title || 'Featured Image'}
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
	);
}

function Pagination({ pageInfo }: { pageInfo: PageInfo }) {
	return (
		<div className="flex justify-center">
			{pageInfo.hasPreviousPage && (
				<Link
					href={`/?before=${pageInfo.startCursor}`}
					className="text-blue-600 hover:text-blue-800"
				>
					Previous
				</Link>
			)}
			{pageInfo.hasNextPage && (
				<Link
					href={`/?after=${pageInfo.endCursor}`}
					className="text-blue-600 hover:text-blue-800"
				>
					Next
				</Link>
			)}
		</div>
	);
}
