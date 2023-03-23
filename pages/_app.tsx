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
				<meta name="viewport" content="viewport-fit=cover, initial-scale=1.0" />
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
