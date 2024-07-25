import React from 'react';
import { useNavigate } from 'react-router-dom'
import image from "/Users/adamelmobdy/Downloads/ACME-Logo-1981.png"

const Display = () => {
    const navigate = useNavigate() // navigate can route the application to a specific URL

    const handleLoginClick = () => {
        navigate('/login')
    }

    const handleRegisterClick = () => {
        navigate('/register')
    }
    


    return (
        <div className="display">
            <img src={image}/>
            <button onClick={handleLoginClick}>Login</button>
            <button onClick={handleRegisterClick}>Sign Up</button>
        </div>
    );
}

export default Display;
