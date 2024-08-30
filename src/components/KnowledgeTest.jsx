import React, { useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import FinancialKnowledgeLevel from './FinancialKnowledgeLevel';
import './KnowledgeTest.css';

const KnowledgeTest = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isTestComplete, setIsTestComplete] = useState(false);


    const questions = [
        {
            question: 'What is the primary purpose of having an emergency fund?',
            answers: ['To buy luxury items', 'To cover unexpected expenses', 'To invest in stocks', 'To pay off long-term loans'],
            correctAnswer: 'To cover unexpected expenses',
        },
        {
            question: 'Which of the following is considered a good debt?',
            answers: ['Credit card debt', 'High-interest personal loan', 'Education loan', 'Payday loan'],
            correctAnswer: 'Education loan',
        },
        {
            question: 'Why is it important to track your income and expenses?',
            answers: ['To impress your friends', 'To plan for retirement', 'To understand your financial position', 'To pay more taxes'],
            correctAnswer: 'To understand your financial position',
        },
        {
            question: 'Which of the following investment options is considered the safest?',
            answers: ['Stocks', 'Real estate', 'Fixed deposits', 'Mutual funds'],
            correctAnswer: 'Fixed deposits',
        },
        {
            question: 'What is the main advantage of compound interest?',
            answers: ['It grows faster over time as interest is earned on interest', 'It requires no initial investment', 'It guarantees high returns', 'It is unaffected by market fluctuations'],
            correctAnswer: 'It grows faster over time as interest is earned on interest',
        },
        {
            question: 'Which type of insurance is most important for protecting a farmer\'s crops?',
            answers: ['Health Insurance', 'Auto Insurance', 'Crop Insurance', 'Life Insurance'],
            correctAnswer: 'Crop Insurance',
        },
        {
            question: 'How can diversification help an investor?',
            answers: ['By increasing the risk of investment', 'By ensuring all investments are in one type of asset', 'By spreading investments across different assets to reduce risk', 'By focusing on short-term gain'],
            correctAnswer: 'By spreading investments across different assets to reduce risk',
        },
        {
            question: 'What is one way to improve your credit score?',
            answers: ['Missing loan payments', 'Keeping credit card balances high', 'Making timely payments on loans and credit cards', 'Closing old credit accounts'],
            correctAnswer: 'Making timely payments on loans and credit cards',
        },
        {
            question: 'Why is it important to consider inflation when planning for the future?',
            answers: ['It decreases the value of money over time', 'It increases the interest rates on loans', 'It guarantees higher returns on investments', 'It affects only luxury items'],
            correctAnswer: 'It decreases the value of money over time',
        },
        {
            question: 'What is the main benefit of setting financial goals?',
            answers: ['To spend money freely', 'To have a clear plan for saving and investing', 'To avoid paying taxes', 'To borrow more money'],
            correctAnswer: 'To have a clear plan for saving and investing',
        }
        // Add more questions here...
    ];

    const handleAnswerChange = (event) => {
        setSelectedAnswer(event.target.value);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }

        setTimeout(() => {
            setIsCorrect(null);
            setSelectedAnswer('');
            if (currentQuestion + 1 < questions.length) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setIsTestComplete(true);
            }
        }, 1000);
    };

    return (
        <div className="knowledge-test-wrapper">
            {isTestComplete ? (
                <FinancialKnowledgeLevel score={score} />
            ) : (
                <>
                    <Typography variant="h3" className="knowledge-test-header" style={{ fontWeight: 'bold' }}>
    KNOWLEDGE TEST
</Typography>
                    <Box className="knowledge-test-container">
                        <Typography className="question-counter">
                            {currentQuestion + 1}/{questions.length}
                        </Typography>
                        <Box className="question-area">
                            <FormControl component="fieldset">
                                <FormLabel component="legend"
                                    sx={{ fontSize: '2.2rem' }}>{questions[currentQuestion].question}</FormLabel>
                                <RadioGroup
                                    aria-label="question"
                                    name="question"
                                    value={selectedAnswer}
                                    onChange={handleAnswerChange}
                                >
                                    {questions[currentQuestion].answers.map((answer, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={answer}
                                            control={<Radio
                                                className={answer === selectedAnswer ? 'answer-button-selected' : 'answer-button'} />}
                                            label={<Typography sx={{
                                                fontSize: '2.1rem',
                                                color: answer === selectedAnswer ? 'red' : 'gray'
                                            }}>{answer}</Typography>}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            {isCorrect !== null && (
                                <Box className={`answer-feedback ${isCorrect ? 'correct' : 'wrong'}`}>
                                    {isCorrect ? 'CORRECT' : 'WRONG'}
                                </Box>
                            )}
                        </Box>
                        <Button variant="contained" className="next-button" onClick={handleNextQuestion}>
                            NEXT
                        </Button>
                    </Box>
                </>
            )}
        </div>
    );
};

export default KnowledgeTest;