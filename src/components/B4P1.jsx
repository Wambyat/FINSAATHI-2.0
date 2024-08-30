import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'; // Import useNavigate
import './B4P1.css';

const B4P1 = () => {
    const [hindiTranslation, setHindiTranslation] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speechUtterance, setSpeechUtterance] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        // Load Hindi voice if available
        window.speechSynthesis.onvoiceschanged = () => {
            const voices = window.speechSynthesis.getVoices();
            const hindiVoice = voices.find(voice => voice.lang === 'hi-IN');
            if (hindiVoice) {
                window.hindiVoice = hindiVoice;
            }
        };

        // Simulate translation (replace this with actual translation API call)
        const simulatedHindiTranslation = "किरण, एक छोटे गाँव का मेहनती किसान, हमेशा अपनी जमीन पर कड़ी मेहनत करता था। अपने प्रयासों के बावजूद, वह अक्सर अपने वित्तीय भविष्य को लेकर चिंतित रहता था। एक शाम, बरगद के पेड़ के नीचे आराम करते हुए, उसकी मुलाकात राजू से हुई, जो एक सेवानिवृत्त स्कूल शिक्षक थे। राजू ने किरण के साथ सेवानिवृत्ति से पहले और बाद में पैसे का प्रबंधन करने के बारे में कुछ मूल्यवान जानकारी साझा की।";
        setHindiTranslation(simulatedHindiTranslation);
    }, []);

    const handleTextToSpeech = () => {
        if (!('speechSynthesis' in window)) {
            alert('Sorry, your browser does not support text-to-speech.');
            return;
        }

        // If already speaking, stop current speech
        if (isSpeaking) {
            window.speechSynthesis.cancel();
        }

        // Create a new speech synthesis utterance
        const utterance = new SpeechSynthesisUtterance(hindiTranslation);
        utterance.lang = 'hi-IN'; // Set the language to Hindi
        utterance.rate = 0.6; // Set speech rate to be slower

        // Use the Hindi voice if available
        if (window.hindiVoice) {
            utterance.voice = window.hindiVoice;
        }

        utterance.onend = () => {
            setIsSpeaking(false); // Stop speaking when the text ends
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
            window.speechSynthesis.cancel(); // Stop current speech
            setIsSpeaking(false);
            handleTextToSpeech(); // Replay the speech
        }
    };

    const handleNext = () => {
        navigate('/B4P2'); // Use navigate to go to B4P2
    };

    return (
        <div className="lesson-page">
            <div className="header">
                <h1>Pre and Post-Retirement Products Lesson 1</h1>
            </div>
            <div className="content">
                <p>Kiran, a diligent farmer in a small village, has always worked hard on his land. Despite his efforts,
                    he
                    often worried about his financial future. One evening, while resting under the banyan tree, he met
                    Raju, a retired school teacher. Raju shared some valuable insights with Kiran about managing money
                    before and after retirement.</p>
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

export default B4P1;
