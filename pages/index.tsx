import type { NextPage } from "next";
import Head from "next/head";
import { PostCard, Categories, PostWidget } from '../components';
import { Post, getPosts } from "../services";
import { FeaturedPosts } from '../sections/index';


interface Props {
  posts: Post[];
}

export const getStaticProps = async (): Promise<{ props: Props }> => {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
};

const Home: NextPage<Props> = ({ posts }) => {
  console.log(posts);

  return (
    <div className="container mx-auto px-10 mb-8">

      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <FeaturedPosts/>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post: Post) => (
            <PostCard post={post} key={post.node.title} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget categories={[]} slug={""} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
