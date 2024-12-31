import Link from 'next/link';
import { getMenu } from '@/lib/wordpress/getMenu';
import Image from 'next/image';

export default async function Header() {
	const data = await getMenu({ id: 'dGVybToyMA==' });
	if (!data.success) {
		return <div>Error</div>;
	}
	return (
		<header className="container mx-auto flex px-4 py-8">
			<h1 className="mr-auto text-4xl font-semibold underline-offset-8 hover:underline">
				<Link prefetch href="/" className="flex items-center gap-2">
					<Image src="/logo.webp" alt="Logo" width={50} height={50} />
					<p>Headless CMS</p>
				</Link>
			</h1>
			{data.success && (
				<ul className="flex items-center gap-5">
					{data.data.menu?.menuItems?.nodes?.map((item) => (
						<li key={item.uri || item.label} className="hover:underline">
							<Link href={item.uri || '/'}>{item.label}</Link>
						</li>
					))}
				</ul>
			)}
		</header>
	);
}
