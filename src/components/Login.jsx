import React, {useState} from "react";
import "./Login.css";
import axios from 'axios'; // Assuming axios is installed

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(null); // Clear any previous errors
        const data = {
            username: email,
            password: password
        };
        try {
            const response = await axios.post('http://localhost:3000/users/login/', data);
            console.log('Login successful:', response.data);
            // Handle successful login (e.g., store token, redirect)
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
            <label>Email</label>
            <input type="text" onChange={e => setEmail(e.target.value)}/>
            <br/>
            <label>Password</label>
            <input type="password" onChange={e => setPassword(e.target.value)}/>
            <br/>
            <button onClick={handleLogin}>Login</button>
            <br/>
            <h2>New here? <a href="/register">Register</a></h2>
        </div>
    );
}

export default Login;
