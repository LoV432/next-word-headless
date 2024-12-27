import Link from 'next/link';

export default function Header() {
	return (
		<header className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-semibold underline-offset-8 hover:underline">
				<Link prefetch href="/">
					Headless CMS
				</Link>
			</h1>
		</header>
	);
}
