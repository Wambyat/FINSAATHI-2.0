import React from 'react';
import './FinancialKnowledgeLevel.css';

const FinancialKnowledgeLevel = () => {
    return (
        <div>
            <h1>FINANCIAL KNOWLEDGE LEVEL</h1>
            <div className="container">
                <div className="test-score">Test Score: 1/10</div>
                <div className="start-learning">Choose Level 1 And Start Learning</div>
                <div className="buttons">
                    <button className="level-button">Level 1</button>
                    <button className="level-button">Level 2</button>
                </div>
            </div>
        </div>
    );
}

export default FinancialKnowledgeLevel;

