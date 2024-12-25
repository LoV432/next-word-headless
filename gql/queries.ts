import { gql } from 'graphql-request';

export const GET_ALL_POSTS = gql`
	query GetAllPosts($first: Int, $after: String, $before: String, $last: Int) {
		posts(first: $first, after: $after, before: $before, last: $last) {
			edges {
				node {
					id
					excerpt
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
`;
