import { getHomepage } from '@/lib/wordpress/getHomepage';

export default async function Home() {
	const data = await getHomepage();
	if (!data.success) {
		return <div>Error</div>;
	}
	return (
		<div>
			<h1>{data.data.pageBy?.title}</h1>
			<div
				dangerouslySetInnerHTML={{ __html: data.data.pageBy?.content || '' }}
			/>
		</div>
	);
}
