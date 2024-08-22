import React from "react";
import {Link} from "react-router-dom";
import Navbar from "./Navbar";
import "./Landing.css";

function Landing() {
    return (
        <div>
            <Navbar/>
            <div className="landing-container">
                <div className="left-panel">
                    <div className="welcome-message">
                        <h1>Let's begin your journey with FINSAATHI</h1>
                        <p>Everything you need to know about financial schemes.</p>
                    </div>
                </div>
                <div className="right-panel">
                    <div className="content-landing">
                        <div className="authentication-info">
                            <h2>Understanding Login Authentication</h2>
                            <p>
                                Login Authentication is a process to verify if a user is who they claim to be. It
                                involves:
                            </p>
                            <ul>
                                <li><strong>Entering a username and password:</strong> Users provide their credentials.
                                </li>
                                <li><strong>Validation:</strong> The system checks these details against stored records.
                                </li>
                                <li><strong>Response:</strong> Access is granted if details match, or an error is shown
                                    if they don't.
                                </li>
                                <li><strong>Response:</strong> Access is granted if details match, or an error is shown
                                    if they don't.
                                </li>
                                <li><strong>Response:</strong> Access is granted if details match, or an error is shown
                                    if they don't.
                                </li>
                                <li><strong>Response:</strong> Access is granted if details match, or an error is shown
                                    if they don't.
                                </li>
                                <li><strong>Response:</strong> Access is granted if details match, or an error is shown
                                    if they don't.
                                </li>
                                <li><strong>Response:</strong> Access is granted if details match, or an error is shown
                                    if they don't.
                                </li>
                                <li><strong>Response:</strong> Access is granted if details match, or an error is shown
                                    if they don't.
                                </li>
                                <li><strong>Response:</strong> Access is granted if details match, or an error is shown
                                    if they don't.
                                </li>
                                <li><strong>Response:</strong> Access is granted if details match, or an error is shown
                                    if they don't.
                                </li>
                            </ul>
                        </div>

                        <div id="about" className="about-section">
                            <h2>About FINSAATHI</h2>
                            <p>FINSAATHI is your ultimate guide to understanding and utilizing various financial
                                schemes. Our goal is to provide you with comprehensive and easy-to-understand
                                information to help you make informed financial decisions.</p>
                            <h1>Get Started</h1>
                            <Link to="/login" id="login">
                                <button className="login-button">Log in</button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
