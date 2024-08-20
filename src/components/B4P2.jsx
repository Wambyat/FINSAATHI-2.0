import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './B4P2.css';

const B4P2 = () => {
  const [hindiTranslation, setHindiTranslation] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechUtterance, setSpeechUtterance] = useState(null);
  const navigate = useNavigate();

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
    const simulatedHindiTranslation = `"सेवानिवृत्ति से पहले और बाद के उत्पाद हमारे जीवन के विभिन्न चरणों में पैसे का प्रबंधन करने में हमारी मदद करने के लिए उपकरणों की तरह हैं," राजू ने समझाया। "सेवानिवृत्ति से पहले, हम उन उत्पादों का उपयोग करते हैं जो हमें पैसे बचाने और एक सुरक्षित भविष्य बनाने में मदद करते हैं। सेवानिवृत्ति के बाद, हमें उन उत्पादों की आवश्यकता होती है जो हमें अपनी बचत का समझदारी से उपयोग करने में मदद करें।"`;
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
    navigate('/B4P3'); // Use navigate to go to B4P2
  };


  return (
    <div className="lesson-page">
      <div className="header">
        <h1>Pre and Post-Retirement Products Lesson 1</h1>
      </div>
      <div className="content">
        <p>
          "Pre and post-retirement products are like tools to help us manage money at different stages of our
          lives," explained Raju. "Before retirement, we use products that help us save money and build a
          secure future. After retirement, we need products that help us use our savings wisely."
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
        <button onClick={handleNext} className="next-button">NEXT </button>
      </div>
    </div>
  );
}

export default B4P2;
