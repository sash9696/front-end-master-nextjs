const { useState, useEffect } = require("react");

const useTextToSpeech = () => {
	const [inputText, setInputText] = useState("");
	const [spokenText, setSpokenText] = useState("");
	const [utterance, setUtterance] = useState(null);
	const [voice, setVoice] = useState(null);
		console.log("voice", voice);

	// useEffect(() => {
	// 	// const voices = speechSynthesis.getVoices();
	// 	// console.log("voices", voices);

	// 	// const femaleVoice = voices.find(
	// 	// 	(v) => v.lang === "en-US" && v.gender === "female"
	// 	// );
	// 	// if (femaleVoice) {
	// 	// 	setVoice(femaleVoice);
	// 	// }
    //     if(window.speechSynthesis){
    //         handleVoiceChange()
    //     }
	// }, []);

	// const handleVoiceChange = () => {
	// 	const voices = speechSynthesis.getVoices();
	// 	const femaleVoice = voices.find(
	// 		(v) => v.lang === "en-US" && v.gender === "female"
	// 	);
    //     console.log('voices',voices)
	// 	if (femaleVoice) {
	// 		setVoice(femaleVoice);
	// 	}
	// };

	const speakText = (text) => {
		const newUtterance = new SpeechSynthesisUtterance(text);
		speechSynthesis.speak(newUtterance);

		const femaleVoice = null;
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
