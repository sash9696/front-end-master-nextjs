const { useState } = require("react");

const useTextToSpeech = () => {
	const [inputText, setInputText] = useState("");
	const [spokenText, setSpokenText] = useState("");
	const [utterance, setUtterance] = useState(null);

	const speakText = (text) => {
		const newUtterance = new SpeechSynthesisUtterance(text);
		speechSynthesis.speak(newUtterance);
		setUtterance(newUtterance);

		setSpokenText(text);
		return newUtterance;
	};

	const handleInputChange = (event) => {
		setInputText(event.target.value);
	};
	const stopSpeaking = () => {
		if (utterance) {
			speechSynthesis.cancel(utterance);
			setUtterance(null);
			setSpokenText("");
		}
	};

	const handleSpeakButtonClick = () => {
		stopSpeaking(); // Stop any currently playing speech before starting new speech
		speakText(inputText);
	};

	return {
		inputText,
		spokenText,
		handleInputChange,
		handleSpeakButtonClick,
		setInputText,
		stopSpeaking,
	};
};
export default useTextToSpeech;
