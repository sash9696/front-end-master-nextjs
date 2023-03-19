// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GraphQLClient, gql } from 'graphql-request';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_TOKEN;

console.log({
  graphqlAPI,
  graphcmsToken

})

export default async function comments(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {name, email, slug, comment} =  req.body;
  const graphQLClient = new GraphQLClient(graphqlAPI as any,{
    headers: {
      authorization: `Bearer ${graphcmsToken}`
    }
  })
  const query = gql`
  mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
    createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) {
      id
    }
  }
  
`;
  try{
    const result = await graphQLClient.request(query, req.body)
    return res.status(200).send(result as any);

  }catch(error){
    console.log(error)
  }

}
