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
					date
					categories {
						nodes {
							slug
							name
						}
					}
				}
			}
			pageInfo {
				endCursor
				hasNextPage
				hasPreviousPage
				startCursor
			}
		}
	}
`;

export const GET_ALL_POSTS_BY_CATEGORY = gql`
	query GetAllPostsFromCategory(
		$first: Int
		$after: String
		$before: String
		$last: Int
		$categoryName: String
	) {
		posts(
			first: $first
			after: $after
			before: $before
			last: $last
			where: { categoryName: $categoryName }
		) {
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
					date
					categories {
						nodes {
							slug
							name
						}
					}
				}
			}
			pageInfo {
				endCursor
				hasNextPage
				hasPreviousPage
				startCursor
			}
		}
	}
`;

export const GET_POST = gql`
	query GetPost($id: ID = "$slug") {
		post(id: $id, idType: SLUG) {
			author {
				node {
					name
				}
			}
			title
			content
			date
			featuredImage {
				node {
					altText
					caption
					mediaItemUrl
				}
			}
			commentCount
			comments {
				nodes {
					content
					date
					author {
						name
					}
				}
			}
			databaseId
		}
	}
`;

export const POST_COMMENT = gql`
	mutation PostComment(
		$author: String
		$authorEmail: String
		$commentOn: Int
		$content: String
	) {
		createComment(
			input: {
				author: $author
				authorEmail: $authorEmail
				commentOn: $commentOn
				content: $content
				status: HOLD
			}
		) {
			success
		}
	}
`;

export const GET_MENU = gql`
	query GetMenu($id: ID!) {
		menu(id: $id) {
			menuItems {
				nodes {
					uri
					label
				}
			}
		}
	}
`;
