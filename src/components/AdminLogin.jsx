import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import "./AdminLogin.css";
import axios from 'axios';

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(null); // Clear any previous errors
        setSuccessMessage(null); // Clear any previous success messages
        const data = {
            username: email,
            password: password
        };
        try {
            const response = await axios.post('http://localhost:3000/admin/login/', data);
            console.log('Login successful:', response.data);
            localStorage.setItem('token', response.data.token);
            console.log('Token:', localStorage.getItem('token'));
            setSuccessMessage("Logged in Successfully as " + data.username + ". Taking you to your dashboard.");
            setTimeout(() => {
                navigate('/AdminDashboard'); // Navigate to Admin Dashboard
            }, 1500);
        } catch (error) {
            console.error('Login error:', error.response.data);
            setErrorMessage(error.response.data.message || "Login failed"); // Set error message
        }
    };

    return (
        <div className="login-container">
            <h1>Login To Admin Dashboard</h1>
            <br/>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <label>Email</label>
            <input type="text" onChange={e => setEmail(e.target.value)}/>
            <br/>
            <label>Password</label>
            <input type="password" onChange={e => setPassword(e.target.value)}/>
            <br/>
            <button onClick={handleLogin}>Login</button>
            <br/>
            <h2>New here? <a href="/AdminRegister">Register</a></h2>
        </div>
    );
}

export default AdminLogin;
