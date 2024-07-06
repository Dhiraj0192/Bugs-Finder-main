import { createContext, useState } from "react";
import run from "../config/gemini";

export let ContextAnalyse = createContext();

const ContextProvider = (props) => {
  let [analysisInput, setAnalysisInput] = useState("");
  let [recentPrompt, setRecentPrompt] = useState("");
  let [showResult, setShowResult] = useState(false);
  let [loading, setLoading] = useState(false);
  let [resultData, setResultData] = useState("");

  let delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  let onSent = async (prompt) => {
    setResultData("");
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
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      let nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

    setLoading(false);
    setAnalysisInput("");
  };

  let analysiscontextValue = {
    analysisInput,
    setAnalysisInput,
    recentPrompt,
    setRecentPrompt,
    showResult,
    onSent,
    setShowResult,
    resultData,
    setResultData,
    loading,
    setLoading,
  };

  return (
    <ContextAnalyse.Provider value={analysiscontextValue}>
      {props.children}
    </ContextAnalyse.Provider>
  );
};

export default ContextProvider;
