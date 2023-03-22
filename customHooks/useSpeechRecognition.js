// import React, { createContext, useContext, useRef, useEffect } from "react";

// const SpeechRecognitionContext = createContext(null);

// const useSpeechRecognition = () => {
//   const SpeechRecognition =
//     typeof window !== "undefined"
//       ? window.SpeechRecognition || window.webkitSpeechRecognition
//       : null;
//   const recognition = useRef(SpeechRecognition ? new SpeechRecognition() : null);
//   const resultRef = useRef(null);

//   useEffect(() => {
//     if (recognition.current) {
//       const handleResult = (e) => {
//         const transcript = e.results[0][0].transcript;
//         if (resultRef.current) {
//           resultRef.current.value += transcript;
//         }
//       };

//       recognition.current.addEventListener("result", handleResult);
//       recognition.current.addEventListener("end", () => {
//         recognition.current?.stop();
//       });

//       return () => {
//         recognition.current?.removeEventListener("result", handleResult);
//         recognition.current?.removeEventListener("end", () => {
//           recognition.current?.stop();
//         });
//       };
//     }
//   }, []);

//   const startRecognition = () => {
//     if (recognition.current) {
//       recognition.current.start();
//     }
//   };

//   return { startRecognition, resultRef };
// };

// const SpeechRecognitionProvider = ({ children }) => {
//   const { startRecognition, resultRef } = useSpeechRecognition();

//   return (
//     <SpeechRecognitionContext.Provider value={{ startRecognition, resultRef }}>
//       {children}
//     </SpeechRecognitionContext.Provider>
//   );
// };

// const useSpeechRecognitionContext = () => {
//   const context = useContext(SpeechRecognitionContext);

//   if (context === null) {
//     throw new Error(
//       "useSpeechRecognitionContext must be used within a SpeechRecognitionProvider"
//     );
//   }

//   return context;
// };

// export { SpeechRecognitionProvider, useSpeechRecognitionContext };
