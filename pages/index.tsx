import type { NextPage } from "next";
import Head from "next/head";
import { PostCard, Categories, PostWidget } from "../components";
import { Post, getPosts } from "../services";
import { FeaturedPosts } from "../sections/index";
// import { useSpeechRecognition } from "../customHooks/useSpeechRecognition";
import { useEffect } from "react";
import { useSpeechRecognitionContext } from "../contexts/SpeechRecognitionContext";

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
	// console.log(posts);
	// const {resultRef} = useSpeechRecognition()

	const { startRecognition, resultRef, speechText }: any =
		useSpeechRecognitionContext();


	const filteredPosts = speechText !== "" ? posts.filter((post: Post) =>
		post?.node?.title.toLowerCase().includes(speechText.toLowerCase()) 
	): posts;

	return (
		<div className="container mx-auto px-10 mb-8">
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<FeaturedPosts />
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="lg:col-span-8 col-span-1">
					{filteredPosts.length > 0 ? (
						filteredPosts.map((post: Post) => (
							<PostCard post={post} key={post.node.title} />
						))
					) : (
						<div className="text-center text-xl text-white">
							No results found. You can look our featured posts!
						</div>
					)}
				</div>
				{/* <div className="lg:col-span-8 col-span-1">
					{posts
						.filter((post: Post) =>
							post?.node?.title
								.toLowerCase()
								.includes(speechText.toLowerCase())
						)
						.map((post: Post) => (
							<>
								{console.log("mappost", post)}
								<PostCard post={post} key={post.node.title} />
							</>
						))}
				</div> */}
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
