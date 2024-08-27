import React, {useState} from "react";
import "./AdminAddQuiz.css";
import axios from "axios";

function AdminAddQuiz() {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [questions, setQuestions] = React.useState([{
        question: "",
        imageLink: "",
        options: [{
            optionId: 0,
            option: ""
        }],
        correctAnswer: 0
    }]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [questionMessage, setQuestionMessage] = useState(null);

    const handleAddQuiz = async (e) => {
        e.preventDefault();
        setErrorMessage(null); // Clear any previous errors
        setSuccessMessage(null); // Clear any previous success messages
        const data = {
            title: title,
            description: description,
            questions: questions
        };
        try {
            const response = await axios.post('http://localhost:3000/admin/quizzes/', data);
            console.log('Quiz added successfully:', response.data);
            setSuccessMessage("Added quiz successfully");
        } catch (error) {
            console.error('Quiz adding error:', error.response.data);
            setErrorMessage(error.response.data.message || "Quiz adding failed");
        }
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, {
            question: "",
            imageLink: "",
            options: [{
                optionId: 0,
                option: ""
            }],
            correctAnswer: 0
        }]);
        setQuestionMessage("Added question.");
        // Clear the question-related text boxes
        document.querySelector('input[name="question"]').value = "";
        document.querySelector('input[name="imageLink"]').value = "";
        document.querySelectorAll('input[name^="option"]').forEach(input => input.value = "");
        document.querySelector('input[name="correctOption"]').value = "";
    };

    return (
        <div className="register-container">
            <h1>Admin Add Quiz</h1>
            <br/>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <label>Title</label>
            <input type="text" onChange={e => setTitle(e.target.value)}/>
            <br/>
            <label>Description</label>
            <input type="text" onChange={e => setDescription(e.target.value)}/>
            <br/>
            {questionMessage && <p className="question-message">{questionMessage}</p>}
            <label>Questions</label>
            <br/>
            <label>Question</label>
            <input type="text" name="question"/>
            <br/>
            <label>Image Link</label>
            <input name="imageLink" type="text"/>
            <br/>
            <label>Options</label>
            <br/>
            <label>Option 1</label>
            <input name="option" type="text"/>
            <br/>
            <label>Option 2</label>
            <input name="option" type="text"/>
            <br/>
            <label>Option 3</label>
            <input name="option" type="text"/>
            <br/>
            <label>Option 4</label>
            <input name="option" type="text"/>
            <br/>
            <label>Correct Answer</label>
            <input name="correctOption" type="number"/>
            <br/>
            <button onClick={handleAddQuestion}>Add Question</button>
            <button onClick={handleAddQuiz}>Add Quiz</button>
            <br/>
        </div>
    );
}

export default AdminAddQuiz;