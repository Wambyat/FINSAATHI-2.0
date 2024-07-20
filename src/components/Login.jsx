import React from "react";
import "./Login.css";

function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <div className="login-container">
            <h1>Login To Admin Dashboard</h1>
            <br/>
            <label>Email</label>
            <input type="text" onChange={e => setEmail(e.target.value)}/>
            <br/>
            <label>Password</label>
            <input type="password" onChange={e => setPassword(e.target.value)}/>
            <br/>
            <button>Login</button>
            <br/>
            <h2>New here? <a href="/register">Register</a> </h2>
        </div>
    );
}

export default Login;