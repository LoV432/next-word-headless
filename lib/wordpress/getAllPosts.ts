import { getSdk, GetAllPostsQueryVariables } from '@/gql/graphql';
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(`${process.env.WORDS_API_URL}`);
const query = getSdk(client).GetAllPosts;

export async function getAllPosts(params: GetAllPostsQueryVariables) {
	try {
		const response = await query(params);
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
