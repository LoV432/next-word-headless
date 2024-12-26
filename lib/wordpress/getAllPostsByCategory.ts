import { GetAllPostsFromCategoryQueryVariables } from '@/gql/graphql';
import { gqlClient } from '@/lib/GraphQLClient';

export async function getAllPostsFromCategory(
	params: GetAllPostsFromCategoryQueryVariables
) {
	try {
		const response = await gqlClient.GetAllPostsFromCategory(params);
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
