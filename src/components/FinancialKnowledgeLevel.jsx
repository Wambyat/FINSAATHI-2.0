import React from 'react';
import './FinancialKnowledgeLevel.css';

const FinancialKnowledgeLevel = ({ score }) => {
    return (
        <div>
            <h1>FINANCIAL KNOWLEDGE LEVEL</h1>
            <div className="container">
                <div className="test-score">Test Score: {score}/10</div>
                <div className="start-learning">
                    {score > 8 ? 'Choose Advanced level And Start Learning' : 'Choose Basic Level And Start Learning'}
                </div>
                <div className="buttons">
                    <button className="level-button">Basic Level</button>
                    <button className="level-button">Advanced Level</button>
                </div>
            </div>
        </div>
    );
}

export default FinancialKnowledgeLevel;


