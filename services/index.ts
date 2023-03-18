import { request, gql } from "graphql-request";

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

const graphqlAPI: string | undefined = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

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

export const getRecentPosts = async (): Promise<Post[]> => {
  const query = gql`
    query GetPostDetails{
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
