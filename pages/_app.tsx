import React from "react";
import { Layout } from "../components";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SpeechRecognitionProvider } from "../contexts/SpeechRecognitionContext";
// import { SpeechRecognitionProvider } from "../customHooks/useSpeechRecognition";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
				/>
				<meta name="description" content="Description" />
				<meta name="keywords" content="Keywords" />
				<title>Front End Hub</title>
				<link rel="manifest" href="/manifest.json" />
				{/* <link
					href="/icons/favicon-16x16.png"
					rel="icon"
					type="image/png"
					sizes="16x16"
				/>
				<link
					href="/icons/favicon-32x32.png"
					rel="icon"
					type="image/png"
					sizes="32x32"
				/>
				<link rel="apple-touch-icon" href="/apple-icon.png"></link>
				<meta name="theme-color" content="#317EFB" /> */}
			</Head>

			<SpeechRecognitionProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</SpeechRecognitionProvider>
		</>
	);
}

export default MyApp;
