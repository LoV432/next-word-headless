import { gql, request } from 'graphql-request';

export default async function safeqlRequest(query: string) {
	try {
		const respnose = await request(
			`${process.env.WORDS_API_URL}`,
			gql`
				${query}
			`
		);
		return {
			success: true as const,
			data: respnose
		};
	} catch (error) {
		console.log(error);
		return {
			success: false as const,
			error: error as any
		};
	}
}
