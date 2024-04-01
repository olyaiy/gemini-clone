import React, { useContext, useState, useEffect } from 'react';
import "./Main.css"
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'


const Main = () => {

  const {onSent,setRecentPrompt,recentPrompt,showResult,loading,resultData,input,setInput,newChat} = useContext(Context)

   const loadPrompt = async (prompt) => {
      setRecentPrompt(prompt)
      await onSent(prompt)
    }

  return (
    <div className="main">
      <div className="nav">
        <div onClick={()=>newChat()} className="gemini-logo">
          <p>Gemini</p>
        </div>    
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">

      {!showResult
      ?<>
        <div className="greet">
            <p><span>Hello there!</span></p>
            <p>How can I help you today?</p>
        </div>
        <div className="cards">
            <div onClick={()=> {
              loadPrompt("Suggest beautiful places to see on an upcoming road trip");
            }} className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
            </div>
            <div onClick={()=> {
              loadPrompt("Briefly summarize this concept: urban planning");
            }} className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
            </div>
            <div onClick={()=> {
              loadPrompt("Brainstorm team bonding activities for our work retreat");
            }} className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
            </div>
            <div onClick={()=> {
              loadPrompt("Improve the readability of the following code:");
            }} className="card">
                <p>Improve the readability of the following code:</p>
                <img src={assets.code_icon} alt="" />
            </div>
        </div>
      </>
      :<div className="result">
        <div className="result-title">
          <img src={assets.user_icon} alt="" />
          <p>{recentPrompt}</p>
        </div>
        <div className="result-data">
          <img src={assets.gemini_icon} alt="" />
          {loading
          ?<div className="loader">
            <hr />
            <hr className = "hr2"/>
            <hr lassName = "hr3"/>
          </div>
          
          :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
        }  

        </div>
      </div>
      }

  
        <div className="main-bottom">
            <div className="search-box">
            <textarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder='Enter a prompt here'
              onKeyDown={(e) => {
                if (input === '' && e.key === 'Enter') {
                  e.preventDefault();
                  } else if (e.key === 'Enter' && !e.shiftKey ) {
                      e.preventDefault();  // Prevent default to avoid a new line on enter key
                      onSent();
                  }
              }}
            />

                  <div>
                      <img src={assets.gallery_icon} alt="" />
                      <img src={assets.mic_icon} alt="" />
                      {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
                  </div>
            </div>
            <p className="bottom-info">
              This project was made by <a href="https://www.linkedin.com/in/olyaiy" >Alex!</a> View the source code and more details in this <a href="https://github.com/olyaiy/gemini-clone" >github repository.</a>
            </p>

        </div>
      </div>
    </div>
  )
}

export default Main
