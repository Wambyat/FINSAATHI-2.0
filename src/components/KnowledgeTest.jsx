import React, { useState } from 'react';
import { Button, Typography, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import './KnowledgeTest.css';

const KnowledgeTest = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [isCorrect, setIsCorrect] = useState(null);

    const questions = [
        {
            question: 'Question 1',
            answers: ['a', 'b', 'c', 'd'],
            correctAnswer: 'a'
        },
        {
            question: 'Question 2',
            answers: ['a', 'b', 'c', 'd'],
            correctAnswer: 'd'

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
            setCurrentQuestion(currentQuestion + 1);
        }, 1000);
    };

    return (
        <Box className="knowledge-test-container">
            <Typography variant="h4" className="knowledge-test-header">
                KNOWLEDGE TEST
            </Typography>
            <Typography className="question-counter">
                {currentQuestion + 1}/{questions.length}
            </Typography>
            <Box className="question-area">
                <FormControl component="fieldset">
                    <FormLabel component="legend" sx={{ fontSize: '1.5rem' }}>{questions[currentQuestion].question}</FormLabel>
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
                                control={<Radio className={answer === selectedAnswer ? 'answer-button-selected' : 'answer-button'} />}
                                label={<Typography sx={{ fontSize: '1.5rem', color: answer === selectedAnswer ? 'red' : 'gray' }}>{answer}</Typography>}
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
            <Button
                variant="contained"
                className="next-button"
                onClick={handleNextQuestion}
            >
                NEXT
            </Button>
        </Box>
    );
};

export default KnowledgeTest;

