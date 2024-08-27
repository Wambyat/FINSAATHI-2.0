import React, { useState } from "react";
import "./AdminAddQuiz.css";
import axios from "axios";

import {useAdminAuthRedirect} from "../hooks/AuthRedirect";

function AdminAddQuiz() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([{
    question: "",
    imageLink: "",
    options: [{ optionId: 0, option: "" }],
    correctAnswer: 0
  }]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [questionMessage, setQuestionMessage] = useState(null);

  const handleAddQuiz = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setQuestions(questions.slice(1)); // Remove the empty question object at the start
    const data = {
      title,
      description,
      questions
    };
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.post('http://localhost:3000/admin/quizzes/', data);
      setSuccessMessage("Quiz added successfully");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Quiz adding failed");
    }
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      question: document.querySelector('input[name="question"]').value,
      imageLink: document.querySelector('input[name="imageLink"]').value,
      options: [
        { optionId: 1, option: document.querySelector('input[name="option1"]').value },
        { optionId: 2, option: document.querySelector('input[name="option2"]').value },
        { optionId: 3, option: document.querySelector('input[name="option3"]').value },
        { optionId: 4, option: document.querySelector('input[name="option4"]').value }
      ],
      correctAnswer: parseInt(document.querySelector('input[name="correctOption"]').value)
    };

    setQuestions([...questions, newQuestion]);
    setQuestionMessage("Added question.");

    // Clear the question-related text boxes
    document.querySelectorAll('input[name="question"], input[name="imageLink"], input[name^="option"], input[name="correctOption"]').forEach(input => input.value = "");
  };

  const handleCorrectAnswerChange = (e) => {
    const value = e.target.value;
    if (value >= 1 && value <= 4) {
      setQuestions(questions.map((q, index) => (
        index === questions.length - 1 ? { ...q, correctAnswer: parseInt(value) } : q
      )));
    }
  };

  return (
    <div className="register-container">
      <h1>Admin Add Quiz</h1>
      <form onSubmit={handleAddQuiz}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        
        <label>Title</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        
        <label>Description</label>
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
        
        {questionMessage && <p className="question-message">{questionMessage}</p>}
        
        <h2 className="section-heading">Questions</h2>
        
        <label>Question</label>
        <input type="text" name="question" />
        
        <label>Image Link</label>
        <input name="imageLink" type="text" />
        
        <h2 className="section-heading">Options</h2>
        
        <label className="option-label">Option 1</label>
        <input name="option1" type="text" />
        
        <label className="option-label">Option 2</label>
        <input name="option2" type="text" />
        
        <label className="option-label">Option 3</label>
        <input name="option3" type="text" />
        
        <label className="option-label">Option 4</label>
        <input name="option4" type="text" />
        
        <label>Correct Answer</label>
        <input
          name="correctOption"
          type="number"
          min="1"
          max="4"
          onChange={handleCorrectAnswerChange}
        />
        
        <button type="button" onClick={handleAddQuestion}>Add Question</button>
        <button type="submit">Submit Quiz</button>
      </form>
    </div>
  );
}

export default AdminAddQuiz;

