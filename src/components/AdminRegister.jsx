import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./AdminRegister.css";
import axios from "axios";
import {useAdminAuthRedirect} from "../hooks/AuthRedirect";

function AdminRegister() {
    useAdminAuthRedirect();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage(null); // Clear any previous errors
        setSuccessMessage(null); // Clear any previous success messages
        const data = {
            username: name,
            email: email,
            password: password
        };
        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.post('http://localhost:3000/admin/signup/', data);
            console.log('Registration successful:', response.data);
            setSuccessMessage("Registered and logged in as " + data.username + ". Taking you to your dashboard.");
            setTimeout(() => {
                navigate('/AdminDashboard'); // Navigate to Admin Dashboard
            }, 1500);
        } catch (error) {
            console.error('Register error:', error.response.data);
            setErrorMessage(error.response.data.message || "Registration failed");
        }
    };

    return (
        <div className="register-container">
            <h1>Admin Register</h1>
            <br/>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <label>Name</label>
            <input type="text" onChange={e => setName(e.target.value)} />
            <br/>
            <label>Email</label>
            <input type="text" onChange={e => setEmail(e.target.value)} />
            <br/>
            <label>Password</label>
            <input type="password" onChange={e => setPassword(e.target.value)} />
            <br/>
            <button onClick={handleRegister}>Register</button>
            <br/>
            <h2>Already a user? <a href="/Login">Login</a></h2>
        </div>
    );
}

export default AdminRegister;
