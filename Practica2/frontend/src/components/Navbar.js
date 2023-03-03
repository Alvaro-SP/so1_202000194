import React from "react";
import "./Navbar.css";

const Navbar = () => {
    return (

        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, backgroundColor: 'white', height: '50px' }}>
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a to="/" className="nav-link">
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a to="/about" className="nav-link">
                            About
                        </a>
                    </li>
                    <li className="nav-item">
                        <a to="/contact" className="nav-link">
                            Contact
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;