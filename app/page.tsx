import { getHomepage } from '@/lib/wordpress/getHomepage';
import Image from 'next/image';

export default async function Home() {
	const data = await getHomepage();
	if (!data.success) {
		return <div>Error</div>;
	}
	const post = data.data.pageBy;
	if (!post) {
		return <div>Page not found</div>;
	}
	return (
		<main className="container mx-auto grid max-w-[900px] grid-cols-1 place-items-start gap-6 px-4 py-8">
			<h1 className="text-4xl font-bold">{post.title}</h1>
			<div className="h-[450px] w-full">
				<Image
					src={
						post.featuredImage?.node.mediaItemUrl ||
						'https://via.placeholder.com/300x200'
					}
					alt={
						post.featuredImage?.node.caption || post.title || 'Featured Image'
					}
					width={700}
					height={700}
					className="h-full w-full rounded-lg object-fill"
				/>
			</div>
			<article
				className="prose min-h-[300px] max-w-full pb-32 lg:prose-lg prose-img:rounded prose-img:border-2 prose-img:border-black"
				// TODO: Figure out if this is safe or not
				dangerouslySetInnerHTML={{
					__html: post.content || ''
				}}
			></article>
		</main>
	);
}
