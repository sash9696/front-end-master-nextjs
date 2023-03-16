import { request, gql } from "graphql-request";

export interface Post {
	node: {
		author: {
			bio: string;
			name: string;
			id: string;
		};
		createdAt: string;
		slug: string;
		title: string;
		excerpt: string;
		featuredImage: {
			url: string;
		};
		categories: {
			name: string;
			slug: string;
		}[];
	};
}

interface QueryResult {
	postsConnection: {
		edges: Post[];
	};
}


const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
	const query = gql`
		query MyQuery {
			postsConnection {
				edges {
					node {
						author {
							bio
							name
							id
						}
						createdAt
						slug
						title
						excerpt
						featuredImage {
							url
						}
						categories {
							name
							slug
						}
					}
				}
			}
		}
	`;

	if (!graphqlAPI) {
		throw new Error("Graphql API endpoint is not defined");
	}

	try {
		const result = await request<QueryResult>(graphqlAPI, query);
    
		console.log("result", result);
		return result.postsConnection.edges || [];
	} catch (error) {
		console.error(error);
		return [];
	}
};
