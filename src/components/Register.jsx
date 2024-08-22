import React, {useState} from "react";
import "./Register.css";
import axios from "axios";

function Register() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage(null); // Clear any previous errors
        setSuccessMessage(null); // Clear any previous success messages
        const data = {
            username:name,
            email: email,
            password: password
        };
        try {
            const response = await axios.post('http://localhost:3000/users/signup/', data);
            console.log('Login successful:', response.data);
            // automatically go to /FinancialKnowledgeLevel
            setSuccessMessage("Registered and logged in in Successfully as "+data.username+". Taking you to your dashboard.");
            setTimeout(() => {
                window.location.href = "/FinancialKnowledgeLevel";
            }, 1500);
        } catch (error) {
            console.error('Register error:', error.response.data);
            setErrorMessage(error.response.data.message || "Register failed");
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <br/>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <label>Name</label>
            <input type="text" onChange={e => setName(e.target.value)}/>
            <br/>
            <label>Email</label>
            <input type="text" onChange={e => setEmail(e.target.value)}/>
            <br/>
            <label>Password</label>
            <input type="password" onChange={e => setPassword(e.target.value)}/>
            <br/>
            <button onClick={handleRegister}>Register</button>
            <br/>
            <h2>Already a user? <a href="/Login">Login</a></h2>
        </div>
    );
}

export default Register;
