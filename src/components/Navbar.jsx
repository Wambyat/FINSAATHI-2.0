import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">FINSAATHI</div>
            <div className="navbar-links">
                {/* <a href="#about" className="navbar-link">About</a> */}
                <a href="#login" className="navbar-link">Login</a>
                {/* If you want a separate login page link, keep this, otherwise remove */}
                {/* <Link to="/login" className="navbar-link">Login</Link> */}
            </div>
        </nav>
    );
}

export default Navbar;
