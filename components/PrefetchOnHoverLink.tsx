'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = React.ComponentProps<typeof Link>;

export function PrefetchOnHoverLink(props: Props) {
	const { href, children, ...rest } = props;
	const router = useRouter();
	return (
		<Link
			href={href}
			onMouseEnter={() => {
				router.prefetch(href.toString());
			}}
			{...rest}
		>
			{children}
		</Link>
	);
}
