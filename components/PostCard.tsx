import React from 'react';

interface PostProps {
  post: {
    title: string;
    excerpt: string;
  }
}

const PostCard: React.FC<PostProps> = ({post}) => {
    console.log(post)
  return (
    <div>
      {post.title}
      {post.excerpt}
    </div>
  )
}

export default PostCard;
