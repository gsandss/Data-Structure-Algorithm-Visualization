import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <nav className="w-full h-18 bg-gray-800 text-white flex items-center justify-center border-b-2 border-white">
            <Link to="/" className="w-full h-full flex items-center justify-center">
                <h1 className="text-lg font-bold">DSA Visualization Tool</h1>
            </Link>
        </nav>
    )
}

export default Navbar;