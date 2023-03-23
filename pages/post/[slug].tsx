import React from "react";
import {
  PostDetail,
  Author,
  CommentsForm,
  Comments,
  Categories,
  PostWidget,
  Loader
} from "../../components";
import { Author as Author2, Category, getPostDetails, getPosts } from "../../services";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

export interface PostDetailsProps {
  author: Author2;
  createdAt: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: {
    url: string;
  };
  categories: Category[];
}

type Props = {
  post: PostDetailsProps;
};

const PostDetails: React.FC<Props> = ({ post }) => {
    const router = useRouter()
    if(router.isFallback){
        return <Loader/>
    }
    // console.log('post',post)
  return (
    <div  className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8 ">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4 ">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const data = await getPostDetails(params?.slug as string);
  return {
    props: { post: data },
  };
};
export async function getStaticPaths(){
    const posts  = await getPosts();

    return{
        paths: posts.map(({node:{slug}}) => ({params:{slug}})),
        fallback:true,
    }
}

export default PostDetails;
