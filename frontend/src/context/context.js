import { createContext, useState } from "react";
import run from "../config/gemini";

export let Context = createContext();

const ContextProvider = (props) => {
  let [input, setInput] = useState("");
  let [recentPrompt, setRecentPrompt] = useState("");
  let [showResult, setShowResult] = useState(false);
  let [loading, setLoading] = useState(false);
  let [resultData, setResultData] = useState("");
  let [finalresultData, setFinalResultData] = useState("");

  // code analysis

  let [inputAnalysis, setInputAnalysis] = useState("");
  let [recentPromptAnalysis, setRecentPromptAnalysis] = useState("");
  let [showResultAnalysis, setShowResultAnalysis] = useState(false);
  let [loadingAnalysis, setLoadingAnalysis] = useState(false);
  let [resultDataAnalysis, setResultDataAnalysis] = useState("");

  let delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
    
  };

  // code analysis

  let delayParaAnalysis = (index, nextWord) => {
    setTimeout(function () {
      setResultDataAnalysis((prev) => prev + nextWord);
    }, 75 * index);
  };

  let onSent = async (prompt) => {
    setResultData("");
    setFinalResultData("");
    setLoading(true);
    setShowResult(true);
    let response = await run(prompt);
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    setFinalResultData(newResponse2)
    let newResponseArray = newResponse2.split(" ");
    
   

    for (let i = 0; i < newResponseArray.length; i++) {
      let nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

    setLoading(false);
    setInput("");
  };

  // code analysis

  let onSentAnalysis = async (prompt) => {
    setResultDataAnalysis("");
    setLoadingAnalysis(true);
    setShowResultAnalysis(true);
    let response = await run(prompt);
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      let nextWord = newResponseArray[i];
      delayParaAnalysis(i, nextWord + " ");
    }

    setLoadingAnalysis(false);
    setInputAnalysis("");
  };

  let contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    showResult,
    onSent,
    setShowResult,
    resultData,
    setResultData,
    loading,
    setLoading,
    finalresultData,
    setFinalResultData,
    // code analysis

    inputAnalysis,
    setInputAnalysis,
    recentPromptAnalysis,
    setRecentPromptAnalysis,
    showResultAnalysis,
    onSentAnalysis,
    setShowResultAnalysis,
    resultDataAnalysis,
    setResultDataAnalysis,
    loadingAnalysis,
    setLoadingAnalysis,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
