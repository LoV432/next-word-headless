import { getAllPosts } from '@/lib/wordpress/getAllPosts';
import { GetAllPostsQuery } from '@/gql/graphql';
import Image from 'next/image';
import Link from 'next/link';
import handlePaginationParams from '@/lib/handlePaginationParams';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, ArrowRightIcon, CalendarDays } from 'lucide-react';

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
			<h1 className="mb-8 text-3xl font-bold">
				<Link href="/">
					Latest Posts <CalendarDays className="inline-block h-5 w-5" />
				</Link>
			</h1>
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
		<div className="relative flex w-full max-w-[300px] flex-col overflow-hidden rounded-lg shadow-md duration-200 hover:translate-y-[-4px] sm:grid sm:max-w-[800px] sm:grid-cols-[245px_1fr] sm:gap-2">
			<div className="h-[205px]">
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
			<div className="flex w-fit flex-col p-4">
				<h2 className="mb-2 text-xl font-semibold">
					<Link
						href={`/post/${post.slug}`}
						className="text-blue-600 before:absolute before:left-0 before:top-0 before:h-full before:w-full hover:text-blue-800"
					>
						{post.title}
					</Link>
				</h2>
				{post.excerpt && (
					<div
						className="mb-4 text-gray-600"
						// TODO: Figure out if this is safe or not
						dangerouslySetInnerHTML={{
							__html:
								post.excerpt.length < 250
									? post.excerpt
									: post.excerpt?.slice(0, 250) + ' [...]' || ''
						}}
					></div>
				)}
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
		<div className="flex justify-center gap-5 pt-5">
			{pageInfo.hasPreviousPage && (
				<Button asChild>
					<Link href={`/?before=${pageInfo.startCursor}`}>
						<ArrowLeftIcon className="h-5 w-5" />
						Previous
					</Link>
				</Button>
			)}
			{pageInfo.hasNextPage && (
				<Button asChild>
					<Link href={`/?after=${pageInfo.endCursor}`}>
						Next
						<ArrowRightIcon className="h-5 w-5" />
					</Link>
				</Button>
			)}
		</div>
	);
}
