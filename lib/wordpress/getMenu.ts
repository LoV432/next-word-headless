import { GetMenuQueryVariables } from '@/gql/graphql';
import { gqlClient } from '@/lib/GraphQLClient';

export async function getMenu(params: GetMenuQueryVariables) {
	try {
		const response = await gqlClient.GetMenu(params);
		return {
			success: true as const,
			data: response
		};
	} catch (error) {
		console.error(error);
		return {
			success: false as const,
			error: error instanceof Error ? error : new Error('Unknown error')
		};
	}
}
