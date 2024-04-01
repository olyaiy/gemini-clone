import React, { createContext, useState, useEffect } from "react";  
import runChat from "../config/gemini";
export const Context = createContext();


const ContextProvider = (props) => {

    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [prevPrompt, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');


    /*
    const delayPara = (index, nextWord) => {
		setTimeout(function () {
			setResultData((prev) => prev + nextWord);
		}, 10 * index);
	};
    */

    const onSent = async (prompt) => {

        // Clear previous input and results, show loading
        setInput('')
        setResultData('')
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)

        // Run the chat function and wait for the response
        const responseObject = await runChat(input)
        let response = responseObject.text

        // Replace ** with strong tags
        response = response.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

        // Replace standalone * with li tags, when at the start of a line or after a line break
        response = response.replace(/(?:\n|^)\*(.+)/g, '<li>$1</li>');

        // Replace newlines with <br> tags
        response = response.replace(/\n/g, '<br>');

        
        // Set the result data and hide loading
        setResultData(response)
        setLoading(false)
    }
    



    const contextValue = {
        prevPrompt,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,     
        input,
        setInput
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )

}

export default ContextProvider