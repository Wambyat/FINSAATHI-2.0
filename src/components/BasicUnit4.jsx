import React from 'react';
import './BasicUnit4.css';

const BasicUnit4 = () => {

    const handleTextToSpeech = () => {
        if (!('speechSynthesis' in window)) {
            alert('Sorry, your browser does not support text-to-speech.');
            return;
        }

        // Get the text from the <h2> element inside the .content div
        const textToRead = document.querySelector('.content h2').innerText;

        // Create a new speech synthesis utterance
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = textToRead;
        utterance.lang = 'hi-IN';  // Set the language to Hindi

        // Speak the text
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="lesson-page">
            <div className="header">
                <h1>Pre and Post-Retirement Products</h1>
            </div>
            <div className="content">
                <h2>Lesson 1: Understanding Surplus, Deficit, and Net Worth</h2>
                <button onClick={handleTextToSpeech} className="tts-button">
                    सुनें (Listen)
                </button>
            </div>
            <div className="footer">
                <button className="next-button">NEXT</button>
            </div>
        </div>
    );
}

export default BasicUnit4;
