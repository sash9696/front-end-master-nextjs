import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Category, getCategories } from "../services";
// import { useSpeechRecognition } from "../customHooks/useSpeechRecognition";
import { useRouter } from "next/router";
import { useSpeechRecognitionContext } from "../contexts/SpeechRecognitionContext";
// import { useSpeechRecognitionContext } from "../customHooks/useSpeechRecognition";

const Header = (): JSX.Element => {
	const [categories, setCategories] = useState<Category[]>([]);
	// const { startRecognition, resultRef } = useSpeechRecognition();
	const { startRecognition, resultRef, speechText, setSpeechText }: any =
		useSpeechRecognitionContext();

	const router = useRouter();

	// console.log("router", speechText);

	const fetchCategories = async () => {
		const result = await getCategories();
		setCategories(result);
		// console.log("categories", categories);
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<div className="container mx-auto px-10 mb-8">
			<div className="border-b w-full inline-block border-blue-400 py-8">
				<div className="md:float-left block">
					<Link href="/">
						<span className="cursor-pointer font-bold text-4xl text-white">
							Front End Hub
						</span>
					</Link>
				</div>
				{!router.pathname.includes("/post") && (
					<div className="flex w-5/6 sm:w-3/4 md:w-1/4 md:float-left block justify-center items-center bg-white px-4 py-2  rounded-full border-gray-300 w-1/5 mx-5 ">
						<input
							className="w-full outline-none  mr-2"
							type="text"
							placeholder="Search for Post Title"
							// value={resultRef.current && resultRef.current}
							// value={speechText}
							onKeyUp={(e) =>
								setSpeechText(resultRef.current.value)
							}
							ref={resultRef}
						/>
						<img
							className="w-10 h-10 cursor-pointer"
							src="https://icon-library.com/images/speech-recognition-icon/speech-recognition-icon-25.jpg"
							alt="Speech Recognition Icon"
							onClick={startRecognition}
						/>
					</div>
				)}

				<div className="hidden md:float-left md:contents">
					{categories.map((category) => (
						<Link
							key={category.slug}
							href={`/category/${category.slug}`}>
							<span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
								{category.name}
							</span>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Header;
