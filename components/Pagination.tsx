import { GetAllPostsQuery } from '@/gql/graphql';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

type PageInfo = NonNullable<GetAllPostsQuery['posts']>['pageInfo'];

export function Pagination({ pageInfo }: { pageInfo: PageInfo }) {
	return (
		<div className="flex justify-center gap-5 pt-5">
			<Button
				asChild
				className={
					pageInfo.hasPreviousPage ? '' : 'pointer-events-none opacity-0'
				}
			>
				<Link href={`?before=${pageInfo.startCursor}`}>
					<ArrowLeftIcon className="h-5 w-5" />
					Previous
				</Link>
			</Button>
			<Button
				asChild
				className={pageInfo.hasNextPage ? '' : 'pointer-events-none opacity-0'}
			>
				<Link href={`?after=${pageInfo.endCursor}`}>
					Next
					<ArrowRightIcon className="h-5 w-5" />
				</Link>
			</Button>
		</div>
	);
}
