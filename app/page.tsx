import { getAllPosts } from '@/lib/wordpress/getAllPosts';
import { PostCard } from '@/components/PostCard';
import handlePaginationParams from '@/lib/handlePaginationParams';
import { CalendarDays } from 'lucide-react';
import { Pagination } from '@/components/Pagination';
import { Metadata } from 'next/types';
import { PrefetchOnHoverLink } from '@/components/PrefetchOnHoverLink';

export const metadata: Metadata = {
	title: 'Headless CMS',
	description:
		'A demo of a headless CMS using WordPress as a backend and Next.js as a frontend'
};

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
		<main className="container mx-auto max-w-[300] px-4 py-8 sm:max-w-[800px]">
			<h1 className="mb-8 text-4xl">
				<PrefetchOnHoverLink href="/">
					All Posts <CalendarDays className="inline-block h-5 w-5" />
				</PrefetchOnHoverLink>
			</h1>
			<div className="grid grid-cols-1 place-items-center gap-6 sm:auto-rows-[230px]">
				{posts.posts?.edges?.map(({ node }) => (
					<PostCard key={node.id} post={node} />
				))}
			</div>
			{posts.posts?.pageInfo && <Pagination pageInfo={posts.posts.pageInfo} />}
		</main>
	);
}
