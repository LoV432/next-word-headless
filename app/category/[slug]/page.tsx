import { getAllPostsFromCategory } from '@/lib/wordpress/getAllPostsByCategory';
import Link from 'next/link';
import handlePaginationParams from '@/lib/handlePaginationParams';
import { CalendarDays } from 'lucide-react';
import { PostCard } from '@/components/PostCard';
import { Pagination } from '@/components/Pagination';

export default async function Home({
	searchParams,
	params
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
	params: Promise<{ slug: string }>;
}) {
	const querySearchParams = await searchParams;
	const queryParams = await params;
	const queryPaginationParams = handlePaginationParams(querySearchParams);
	const response = await getAllPostsFromCategory({
		...queryPaginationParams,
		categoryName: queryParams.slug
	});
	if (!response.success) {
		return <div>Error while fetching posts</div>;
	}
	const posts = response.data;
	return (
		<main className="container mx-auto max-w-[300] px-4 py-8 sm:max-w-[800px]">
			<h1 className="mb-8 text-4xl">
				<Link href={`/category/${queryParams.slug}`}>
					All Posts in {queryParams.slug}{' '}
					<CalendarDays className="inline-block h-5 w-5" />
				</Link>
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
