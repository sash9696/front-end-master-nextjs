import React, { useEffect, useState } from "react";
import { getRecentPosts, getSimilarPosts } from "../services";
import moment from "moment";
import Link from "next/link";

interface Post {
  title: string;
  featuredImage: {
    url: string;
  };
  createdAt: string;
  slug: string;
}

interface Props {
  categories: string[];
  slug: string;
}

const PostWidget: React.FC<Props> = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  async function fetchRelatedPosts(categories: string[], slug?: string):Promise<void>  {
    const fetchFn = slug ? getSimilarPosts : getRecentPosts;
    try {
      const result = await fetchFn(categories as any, slug as any);
      setRelatedPosts(result as any);
      console.log("result", result);
    } catch (error) {
      console.error(error);
      setRelatedPosts([]);
    }
  }

  useEffect(() => {
    fetchRelatedPosts(categories, slug);
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold pb-4 border-b">
        {slug ? "Related Posts" : "Recent posts"}
      </h3>
      {relatedPosts?.map((post) => (
        <div key={post.title} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img
              alt={post.title}
              height={60}
              width={60}
              className="align-middle rounded-full"
              src={post.featuredImage.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 text-xs">
              {moment(post.createdAt).format("MM DD, YYYY")}
            </p>
            <Link href={`/post/${post.slug}`} key={post.title} className="text-md">
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
