import React from "react";
import { Layout } from "../components";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SpeechRecognitionProvider } from "../contexts/SpeechRecognitionContext";
// import { SpeechRecognitionProvider } from "../customHooks/useSpeechRecognition";


function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SpeechRecognitionProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SpeechRecognitionProvider>
	);
}

export default MyApp;
