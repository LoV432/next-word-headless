import Image from 'next/image';
import { GetAllPostsQuery } from '@/gql/graphql';
import { PrefetchOnHoverLink } from '@/components/PrefetchOnHoverLink';

type Post = NonNullable<GetAllPostsQuery['posts']>['edges'][0]['node'];

export function PostCard({ post }: { post: Post }) {
	return (
		<div className="relative flex h-full w-full flex-col overflow-hidden rounded-lg shadow-md duration-200 hover:translate-y-[-4px]">
			<div className="h-[230px]">
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
					className="h-[230px] w-full object-cover"
				/>
			</div>
			<div className="flex h-full w-fit flex-col p-4">
				<h2 className="mb-2 text-xl font-semibold">
					<PrefetchOnHoverLink
						href={`/post/${post.slug}`}
						className="text-blue-600 before:absolute before:left-0 before:top-0 before:h-full before:w-full hover:text-blue-800"
					>
						{post.title}
					</PrefetchOnHoverLink>
				</h2>
				<div className="flex gap-2">
					{post.categories?.nodes?.map((category) => (
						<PrefetchOnHoverLink
							href={`/category/${category.name}`}
							key={category.slug}
							className="z-10 mb-2 text-sm text-gray-500 hover:text-gray-600 hover:underline"
						>
							{category.name}
						</PrefetchOnHoverLink>
					))}
				</div>
				{post.excerpt && (
					<div
						className="mb-4 text-gray-600"
						// TODO: Figure out if this is safe or not
						dangerouslySetInnerHTML={{
							__html:
								post.excerpt.length < 250
									? post.excerpt
									: post.excerpt?.slice(0, 200) + ' [...]' || ''
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
