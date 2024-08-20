import React, { useEffect, useState } from 'react';
import './B4P3.css';

const B4P3 = () => {
  const [hindiTranslation, setHindiTranslation] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechUtterance, setSpeechUtterance] = useState(null);

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
    const simulatedHindiTranslation = "किरण ने सीखा कि अपनी वित्तीय स्थिति को समझने के लिए उसे यह गणना करनी पड़ी कि क्या उसके पास अधिशेष है या घाटा। यदि उसने जितना कमाया उससे अधिक खर्च किया, तो उसके पास घाटा था। यदि उसने कमाया उससे अधिक खर्च किया, तो उसके पास घाटा था। किराण ने यह भी सीखा कि नेट वर्थ (नेट संपत्ति) उसकी निवेशों और उधारी के बीच का अंतर है।";
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

  return (
    <div className="lesson-page">
      <div className="header">
        <h1>Pre and Post-Retirement Products Lesson 1</h1>
      </div>
      <div className="content">
        <p>Kiran learned that to understand his financial situation, he needed to calculate whether he had a surplus or a deficit. If he earned more than he spent, he had a surplus. If he spent more than he earned, he had a deficit. Kiran also learned about net worth, which is the difference between his investments and borrowings.</p>
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
        <button className="next-button">NEXT</button>
      </div>
    </div>
  );
}

export default B4P3;