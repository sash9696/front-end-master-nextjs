import { createContext, useContext, useEffect, useRef, useState } from "react";

const SpeechRecognitionContext = createContext(null);

const useSpeechRecognition = () => {
	const SpeechRecognition =
		typeof window !== "undefined"
			? window.SpeechRecognition || window.webkitSpeechRecognition
			: null;

	const recognition = useRef(
		SpeechRecognition ? new SpeechRecognition() : null
	);
	const resultRef = useRef(null);
	const [speechText, setSpeechText] = useState("");


	const startRecognition = () => {
		if (recognition.current) {
			recognition.current.start();
		}
	};

	useEffect(() => {

		if (recognition.current) {
			const handleResult = (e) => {
				const transcript = e.results[0][0].transcript;
				let newSpeechText = speechText;
				newSpeechText += transcript;
				if (resultRef.current) {
					resultRef.current.value += transcript;
					setSpeechText(resultRef.current.value);
				}
			};

			recognition.current.addEventListener("result", handleResult);
			recognition.current.addEventListener("end", () => {
				recognition.current?.stop();
			});

			return () => {
				recognition.current?.removeEventListener(
					"result",
					handleResult
				);
				recognition.current?.removeEventListener("end", () => {
					recognition.current?.stop();
				});
			};
		}
	}, []);

	return { startRecognition, resultRef, speechText, setSpeechText };
};

const SpeechRecognitionProvider = ({ children }) => {
	const { startRecognition, resultRef, speechText, setSpeechText } =
		useSpeechRecognition();

	return (
		<SpeechRecognitionContext.Provider
			value={{ startRecognition, resultRef, speechText, setSpeechText }}>
			{children}
		</SpeechRecognitionContext.Provider>
	);
};

const useSpeechRecognitionContext = () => {
	const context = useContext(SpeechRecognitionContext);


	if (context === null) {
		throw new Error(
			"useSpeechRecognitionContext must be used with a SpeechRecognitionProvide"
		);
	}
	return context;
};

export { SpeechRecognitionProvider, useSpeechRecognitionContext };
