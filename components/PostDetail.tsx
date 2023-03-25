import React, { useEffect, useMemo } from "react";

import moment from "moment";

import useTextToSpeech from "../customHooks/useTextToSpeech";

const PostDetail = ({ post }: any) => {
	const {
		inputText,
		setInputText,
		spokenText,
		handleInputChange,
		handleSpeakButtonClick,
		stopSpeaking
	} = useTextToSpeech();

	console.log("inputText", inputText);

	console.log("post", post);
	// const updatedPost: any = useMemo(() => {
	// 	post
	// }, [post]);

	useEffect(() => {
		let abc = post.content.raw.children.map((typeObj: any, index: any) => {
			const children = typeObj.children.map((item: any, itemindex: any) =>
				getContentFragment2(itemindex, item.text, item, "")
			);
			// console.log("children", children);

			return getContentFragment2(index, children, typeObj, typeObj.type);
		});

		// console.log("abc", abc);
		const result: any = abc.map((arr: any) => arr.join(" ")).join("\n");
		// console.log("result", result);
		setInputText(result);
	}, []);
	const getContentFragment = (index: any, text: any, obj: any, type: any) => {
		let modifiedText = text;

		if (obj) {
			if (obj.bold) {
				modifiedText = <b key={index}>{text}</b>;
			}

			if (obj.italic) {
				modifiedText = <em key={index}>{text}</em>;
			}

			if (obj.underline) {
				modifiedText = <u key={index}>{text}</u>;
			}
		}

		switch (type) {
			case "heading-three":
				return (
					<h3 key={index} className="text-xl font-semibold mb-4">
						{modifiedText.map(
							(
								item:
									| string
									| number
									| boolean
									| React.ReactElement<
											any,
											| string
											| React.JSXElementConstructor<any>
									  >
									| React.ReactFragment
									| React.ReactPortal
									| null
									| undefined,
								i: React.Key | null | undefined
							) => (
								<React.Fragment key={i}>{item}</React.Fragment>
							)
						)}
					</h3>
				);
			case "paragraph":
				return (
					<p key={index} className="mb-8">
						{modifiedText.map(
							(
								item:
									| string
									| number
									| boolean
									| React.ReactFragment
									| React.ReactPortal
									| React.ReactElement<
											any,
											| string
											| React.JSXElementConstructor<any>
									  >
									| null
									| undefined,
								i: React.Key | null | undefined
							) => (
								<React.Fragment key={i}>{item}</React.Fragment>
							)
						)}
					</p>
				);
			case "heading-four":
				return (
					<h4 key={index} className="text-md font-semibold mb-4">
						{modifiedText.map(
							(
								item:
									| string
									| number
									| boolean
									| React.ReactFragment
									| React.ReactPortal
									| React.ReactElement<
											any,
											| string
											| React.JSXElementConstructor<any>
									  >
									| null
									| undefined,
								i: React.Key | null | undefined
							) => (
								<React.Fragment key={i}>{item}</React.Fragment>
							)
						)}
					</h4>
				);
			case "image":
				return (
					<img
						key={index}
						alt={obj.title}
						height={obj.height}
						width={obj.width}
						src={obj.src}
					/>
				);
			case "code-block":
				return (
					<pre
						key={index}
						className="text-xs whitespace-pre-wrap overflow-x-auto h-fit sm:whitespace-pre w-full md:text-md mb-4 bg-slate-300 p-4">
						{modifiedText.map(
							(
								item:
									| string
									| number
									| boolean
									| React.ReactFragment
									| React.ReactPortal
									| React.ReactElement<
											any,
											| string
											| React.JSXElementConstructor<any>
									  >
									| null
									| undefined,
								i: React.Key | null | undefined
							) => (
								<React.Fragment key={i}>{item}</React.Fragment>
							)
						)}
					</pre>
				);
			default:
				return modifiedText;
		}
	};

	const getContentFragment2 = (
		index: any,
		text: any,
		obj: any,
		type: any
	) => {
		let modifiedText = text;

		// switch (type) {
		// 	case "heading-three":
		// 		return (
		// 			<h3 key={index} className="text-xl font-semibold mb-4">
		// 				{modifiedText.map(
		// 					(
		// 						item:
		// 							| string
		// 							| number
		// 							| boolean
		// 							| React.ReactElement<
		// 									any,
		// 									| string
		// 									| React.JSXElementConstructor<any>
		// 							  >
		// 							| React.ReactFragment
		// 							| React.ReactPortal
		// 							| null
		// 							| undefined,
		// 						i: React.Key | null | undefined
		// 					) => (
		// 						<React.Fragment key={i}>{item}</React.Fragment>
		// 					)
		// 				)}
		// 			</h3>
		// 		);
		// 	case "paragraph":
		// 		return (
		// 			<p key={index} className="mb-8">
		// 				{modifiedText.map(
		// 					(
		// 						item:
		// 							| string
		// 							| number
		// 							| boolean
		// 							| React.ReactFragment
		// 							| React.ReactPortal
		// 							| React.ReactElement<
		// 									any,
		// 									| string
		// 									| React.JSXElementConstructor<any>
		// 							  >
		// 							| null
		// 							| undefined,
		// 						i: React.Key | null | undefined
		// 					) => (
		// 						<React.Fragment key={i}>{item}</React.Fragment>
		// 					)
		// 				)}
		// 			</p>
		// 		);
		// 	case "heading-four":
		// 		return (
		// 			<h4 key={index} className="text-md font-semibold mb-4">
		// 				{modifiedText.map(
		// 					(
		// 						item:
		// 							| string
		// 							| number
		// 							| boolean
		// 							| React.ReactFragment
		// 							| React.ReactPortal
		// 							| React.ReactElement<
		// 									any,
		// 									| string
		// 									| React.JSXElementConstructor<any>
		// 							  >
		// 							| null
		// 							| undefined,
		// 						i: React.Key | null | undefined
		// 					) => (
		// 						<React.Fragment key={i}>{item}</React.Fragment>
		// 					)
		// 				)}
		// 			</h4>
		// 		);
		// 	case "image":
		// 		return (
		// 			<img
		// 				key={index}
		// 				alt={obj.title}
		// 				height={obj.height}
		// 				width={obj.width}
		// 				src={obj.src}
		// 			/>
		// 		);
		// 	case "code-block":
		// 		return (
		// 			<pre
		// 				key={index}
		// 				className="text-xs whitespace-pre-wrap overflow-x-auto h-fit sm:whitespace-pre w-full md:text-md mb-4 bg-slate-300 p-4">
		// 				{modifiedText.map(
		// 					(
		// 						item:
		// 							| string
		// 							| number
		// 							| boolean
		// 							| React.ReactFragment
		// 							| React.ReactPortal
		// 							| React.ReactElement<
		// 									any,
		// 									| string
		// 									| React.JSXElementConstructor<any>
		// 							  >
		// 							| null
		// 							| undefined,
		// 						i: React.Key | null | undefined
		// 					) => (
		// 						<React.Fragment key={i}>{item}</React.Fragment>
		// 					)
		// 				)}
		// 			</pre>
		// 		);
		// 	default:
		// 		return modifiedText;
		// }

		return modifiedText;
	};

	return (
		<>
			<div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
				<div className="relative overflow-hidden shadow-md mb-6">
					<img
						src={post.featuredImage.url}
						alt=""
						className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg"
					/>
				</div>
				<div className="px-4 lg:px-0">
					<div className="flex items-center mb-8 w-full">
						<div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center">
							<img
								alt={post.author.name}
								height="30px"
								width="30px"
								className="align-middle rounded-full"
								src={post.author.photo.url}
							/>
							<p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
								{post.author.name}
							</p>
						</div>
						<div className="font-medium text-gray-700">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 inline mr-2 text-pink-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
							<span className="align-middle">
								{moment(post.createdAt).format("MMM DD, YYYY")}
							</span>
						</div>
					</div>
					<div className="mb-8 flex justify-between items-center">
						<h1 className="text-3xl font-semibold w-1/2">{post.title}</h1>

						<div>
							<button onClick={handleSpeakButtonClick} className="mr-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out">
								Listen to Post
							</button>
							<button 
							onClick={stopSpeaking}
							className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out">
  								Stop Listening
							</button>
						</div>
						
					</div>

					{post.content.raw.children.map(
						(typeObj: any, index: any) => {
							const children = typeObj.children.map(
								(item: any, itemindex: any) =>
									getContentFragment(
										itemindex,
										item.text,
										item,
										""
									)
							);

							return getContentFragment(
								index,
								children,
								typeObj,
								typeObj.type
							);
						}
					)}
				</div>
			</div>
		</>
	);
};

export default PostDetail;
