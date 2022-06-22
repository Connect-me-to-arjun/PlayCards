import React from 'react';
import {useState} from 'react'
import MicIcon from '@mui/icons-material/Mic';
import './Voice.scss'
const Voice = (props) => {
    const [text,setText]=useState('')
        let listening = false;
        var SpeechRecognitions = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognise=()=> {
            if (!listening) {
              const recognition = new SpeechRecognitions();
              recognition.onstart = function () {
                listening = true;
                setText("Listening")
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
                const parsed = parseInt(transcript);
                setText('')
                if (isNaN(parsed)) {
                  console.log('transcript');
                }
                else{
                  console.log('got the value')
                  props.set(parsed);
                }
              };
              recognition.start();
            }
          }
    return (
        <div>
            {/* <button onClick={recognise}>Start</button> */}
            <div onClick={recognise}>
            <MicIcon style={{fontSize:"80px",color:"#6baf9c"}}/>
            <p className='voiceText'>{text}</p>
            </div>
          
        </div>
    );
};

export default Voice;