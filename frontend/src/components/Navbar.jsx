import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <nav className="navbar">
            <Link to="/" className="nav-text">
                <h1>DSA Visualization Tool</h1>
            </Link>
        </nav>
    )
}

export default Navbar;