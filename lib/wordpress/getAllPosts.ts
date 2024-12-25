import safeqlRequest from '../safeqlRequest';

export default async function getAllPosts({
	first,
	after,
	before,
	last
}: {
	first?: number;
	after?: string;
	before?: string;
	last?: number;
}) {
	const response = await safeqlRequest(`
		query getAllPosts {
			posts (${first ? `first: ${first}` : ''}, after: "${after}", before: "${before}", ${last ? `last: ${last}` : ''}) {
				edges {
					node {
						id
						content
						slug
						title
						featuredImage {
							node {
								caption
								mediaItemUrl
							}
						}
						author {
							node {
								name
								userId
							}
						}
					}
				}
			}
		}
	`);

	if (!response.success) {
		throw new Error(response.error);
	}

	return response.data;
}
