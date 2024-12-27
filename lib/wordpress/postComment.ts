import { PostCommentMutationVariables } from '@/gql/graphql';
import { gqlClient } from '@/lib/GraphQLClient';

export default async function postComment({
	params
}: {
	params: PostCommentMutationVariables;
}) {
	try {
		const response = await gqlClient.PostComment(params);
		return { success: true as const, data: response };
	} catch (error) {
		console.error(error);
		return {
			success: false as const,
			error: error instanceof Error ? error : new Error('Unknown error')
		};
	}
}
