import React from 'react';
import {useEffect,useState} from 'react'
const Voice = (props) => {
    const [text,setText]=useState('')
        let listening = false;
        var SpeechRecognitions = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognise=()=> {
          
            if (!listening) {
              const recognition = new SpeechRecognitions();
        
              recognition.onstart = function () {
                listening = true;
              };
        
              recognition.onspeechend = function () {
                recognition.stop();
                
                listening = false;
              };
        
              recognition.onerror = function (e) {
               alert(JSON.stringify(e))
                listening = false;
              };
        
              recognition.onresult = function (event) {
                const transcript = event.results[0][0].transcript;
                const confidence = event.results[0][0].confidence;
                setText(parseInt(transcript))
                props.set(transcript)
                console.log(transcript)
                if (transcript.length > 0) {
                  
                }
              };
        
              recognition.start();
            }
          }
    return (
        <div>
            voice
            <button onClick={recognise}>Start</button>
            <p>{text}</p>
        </div>
    );
};

export default Voice;