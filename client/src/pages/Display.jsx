import React from 'react';
import { useNavigate } from 'react-router-dom'

const Display = () => {
    const navigate = useNavigate() // navigate can route the application to a specific URL

    const handleLoginClick = () => {
        navigate('/login')
    }

    const handleRegisterClick = () => {
        navigate('/register')
    }
    


    return (
        <div className="home">
            <h4>Welcome</h4>
            <button onClick={handleLoginClick}>Login</button>
            <button onClick={handleRegisterClick}>Sign Up</button>
        </div>
    );
}

export default Display;
