import { gqlClient } from '@/lib/GraphQLClient';

export async function getHomepage() {
	try {
		const response = await gqlClient.GetHomepage();
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
