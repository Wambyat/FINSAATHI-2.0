import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'; // Import useNavigate
import './BasicUnit4.css';

const BasicUnit4 = () => {
    const [hindiTranslation, setHindiTranslation] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speechUtterance, setSpeechUtterance] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        window.speechSynthesis.onvoiceschanged = () => {
            const voices = window.speechSynthesis.getVoices();
            const hindiVoice = voices.find(voice => voice.lang === 'hi-IN');
            if (hindiVoice) {
                window.hindiVoice = hindiVoice;
            }
        };

        const simulatedHindiTranslation = "पाठ 1   अधिशेष, घाटा और कुल संपत्ति को समझना";
        setHindiTranslation(simulatedHindiTranslation);
    }, []);

    const handleTextToSpeech = () => {
        if (!('speechSynthesis' in window)) {
            alert('Sorry, your browser does not support text-to-speech.');
            return;
        }

        if (isSpeaking) {
            window.speechSynthesis.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(hindiTranslation);
        utterance.lang = 'hi-IN';
        utterance.rate = 0.6;

        if (window.hindiVoice) {
            utterance.voice = window.hindiVoice;
        }

        utterance.onend = () => {
            setIsSpeaking(false);
        };

        setSpeechUtterance(utterance);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
    };

    const handlePause = () => {
        if (isSpeaking) {
            window.speechSynthesis.pause();
        }
    };

    const handleResume = () => {
        if (isSpeaking) {
            window.speechSynthesis.resume();
        }
    };

    const handleReplay = () => {
        if (speechUtterance) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            handleTextToSpeech();
        }
    };

    const handleNext = () => {
        navigate('/B4P1'); // Navigate to B4P1 page
    };

    return (
        <div className="lesson-page">
            <div className="header">
                <h1>Pre and Post-Retirement Products</h1>
            </div>
            <div className="content">
                <p>
                    "Lesson 1: Understanding Surplus, Deficit, and Net Worth"
                </p>
                <div className="tts-controls">
                    <button onClick={handleTextToSpeech} className="tts-button">
                        &#x1F50A; {/* Speaker icon for Listen */}
                    </button>
                    <button onClick={handlePause} className="tts-button">
                        &#10074;&#10074; {/* Pause icon */}
                    </button>
                    <button onClick={handleResume} className="tts-button">
                        &#9658; {/* Play icon for Resume */}
                    </button>
                    <button onClick={handleReplay} className="tts-button">
                        &#8635; {/* Replay icon */}
                    </button>
                </div>
            </div>
            <div className="footer">
                <button onClick={handleNext} className="next-button">NEXT</button>
            </div>
        </div>
    );
}

export default BasicUnit4;


