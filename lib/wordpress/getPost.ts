import { GetPostQueryVariables, getSdk } from '@/gql/graphql';
import { gqlClient } from '@/lib/GraphQLClient';

export default async function getPost({
	params
}: {
	params: GetPostQueryVariables;
}) {
	try {
		const response = await gqlClient.GetPost(params);
		return { success: true as const, data: response };
	} catch (error) {
		console.error(error);
		return {
			success: false as const,
			error: error instanceof Error ? error : new Error('Unknown error')
		};
	}
}
