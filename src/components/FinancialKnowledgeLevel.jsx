import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FinancialKnowledgeLevel.css';

const FinancialKnowledgeLevel = ({ score }) => {
    const navigate = useNavigate();

    const handleBasicLevelClick = () => {
        navigate('/BasicLevelUnits');
    };

    const handleAdvancedLevelClick = () => {
        navigate('/AdvancedLevelUnits');
    };

    return (
        <div>
            <div className="container">
            <h1>FINANCIAL KNOWLEDGE LEVEL</h1>
                <div className="test-score">Test Score: {score}/10</div>
                <div className="start-learning">
                    {score > 8 ? 'Choose Advanced Level And Start Learning' : 'Choose Basic Level And Start Learning'}
                </div>
                <div className="buttons">
                    <button className="level-button" onClick={handleBasicLevelClick}>Basic Level</button>
                    <button className="level-button" onClick={handleAdvancedLevelClick}>Advanced Level</button>
                </div>
            </div>
        </div>
    );
}

export default FinancialKnowledgeLevel;



