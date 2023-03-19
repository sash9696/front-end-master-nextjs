import { request, gql } from "graphql-request";
import { PostDetailsProps } from "../pages/post/[slug]";

export interface Author {
	bio: string;
	name: string;
	id: string;
	photo: {
		url: string;
	};
}

export interface Category {
	name: string;
	slug: string;
}

export interface Post {
	node: {
		author: Author;
		createdAt: string;
		slug: string;
		title: string;
		excerpt: string;
		featuredImage: {
			url: string;
		};
		categories: Category[];
	};
}

export interface QueryResult {
	postsConnection: {
		edges: Post[];
	};
}

interface CategoriesData {
	categories: Category[];
}
const graphqlAPI: string | undefined =
	process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async (): Promise<Post[]> => {
	const query = gql`
		query MyQuery {
			postsConnection {
				edges {
					node {
						author {
							bio
							name
							id
							photo {
								url
							}
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
export const getPostDetails = async (slug: string): Promise<any> => {
	const query = gql`
		query GetPostDetails($slug: String!) {
			post(where: { slug: $slug }) {
				author {
					bio
					name
					id
					photo {
						url
					}
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
				content {
					raw
				}
			}
		}
	`;

	if (!graphqlAPI) {
		throw new Error("Graphql API endpoint is not defined");
	}

	try {
		const result = await request<any>(graphqlAPI, query, {
			slug,
		});

		console.log("result", result);
		return result.post || [];
	} catch (error) {
		console.error(error);
	}
};

export const getRecentPosts = async (): Promise<Post[]> => {
	const query = gql`
		query GetPostDetails {
			posts(orderBy: createdAt_ASC, last: 3) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
			}
		}
	`;

	try {
		if (!graphqlAPI) {
			throw new Error("Graphql API endpoint is not defined");
		}

		const result = await request<{ posts: Post[] }>(graphqlAPI, query);

		console.log("result", result);
		return result.posts || [];
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const getSimilarPosts = async (
	slug: string,
	categories: string[]
): Promise<Post[]> => {
	const query = gql`
		query GetPostDetails($slug: String!, $categories: [String!]) {
			posts(
				where: {
					slug_not: $slug
					AND: { categories_some: { slug_in: $categories } }
				}
				last: 3
			) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
			}
		}
	`;
	try {
		if (!graphqlAPI) {
			throw new Error("Graphql API endpoint is not defined");
		}
		const result = await request<{ posts: Post[] }>(graphqlAPI, query, {
			slug,
			categories,
		});
		return result.posts || [];
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const getCategories = async (): Promise<Category[]> => {
	const query = gql`
		query GetCategories {
			categories {
				name
				slug
			}
		}
	`;
	try {
		if (!graphqlAPI) {
			throw new Error("Graphql API endpoint is not defined");
		}
		const { categories } = await request<CategoriesData>(graphqlAPI, query);
		return categories || [];
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const submitComment = async (obj: any) => {
	const result = await fetch(`/api/comments`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(obj),
	});
	return result.json();
};
export const getComments = async (slug: any): Promise<Category[]> => {
	const query = gql`
		query GetComments($slug: String!) {
			comments(where: { post: { slug: $slug } }) {
				name
				createdAt
				comment
			}
		}
	`;
	try {
		if (!graphqlAPI) {
			throw new Error("Graphql API endpoint is not defined");
		}
		const { comments } = await request<any>(graphqlAPI, query, { slug });
		return comments || [];
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const getAdjacentPosts = async (createdAt: any, slug: any) => {
	const query = gql`
		query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
			next: posts(
				first: 1
				orderBy: createdAt_ASC
				where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
			) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
			}
			previous: posts(
				first: 1
				orderBy: createdAt_DESC
				where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
			) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
			}
		}
	`;
	if (!graphqlAPI) {
		throw new Error("Graphql API endpoint is not defined");
	}

	const result: any = await request(graphqlAPI, query, { slug, createdAt });

	return { next: result.next[0], previous: result.previous[0] };
};

export const getFeaturedPosts = async () => {
	const query = gql`
	  query GetCategoryPost() {
		posts(where: {featuredPost: true}) {
		  author {
			name
			photo {
			  url
			}
		  }
		  featuredImage {
			url
		  }
		  title
		  slug
		  createdAt
		}
	  }   
	`;
	if (!graphqlAPI) {
		throw new Error("Graphql API endpoint is not defined");
	}

	const result: any = await request(graphqlAPI, query);

	return result.posts;
};
export const getCategoryPost = async (slug: any) => {
	const query = gql`
		query GetCategoryPost($slug: String!) {
			postsConnection(where: { categories_some: { slug: $slug } }) {
				edges {
					cursor
					node {
						author {
							bio
							name
							id
							photo {
								url
							}
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

	const result: any = await request(graphqlAPI, query, { slug });

	return result.postsConnection.edges;
};
