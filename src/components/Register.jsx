import React from "react";
import "./Register.css";

function Register() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <div className="register-container">
            <h1>Register to the website</h1>
            <br/>
            <label>Name</label>
            <input type="text" onChange={e => setName(e.target.value)}/>
            <br/>
            <label>Email</label>
            <input type="text" onChange={e => setEmail(e.target.value)}/>
            <br/>
            <label>Password</label>
            <input type="password" onChange={e => setPassword(e.target.value)}/>
            <br/>
            <button>Register</button>
            <br/>
            Already a user? <a href="/Login">Login</a>
        </div>
    );
}

export default Register;
