import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user'); 
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:5050/users/register', { username, password, email, role });
            setMessage(response.data.message);
            if (response.status === 201) {
                navigate('/login'); // Redirect to login page after successful registration
            } else if (response.data.message === 'User already exists') {
                setMessage(response.data.message);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to register');
        }
    };

    return (

          <div className='Register'>
                   
                <form className="items" onSubmit={handleSubmit}>
                <h1> Register</h1>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
         
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                        <div className='Pick'>
                        <label> Role </label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        </div> 
                    <button type="submit">
                        Register
                    </button>
                </form>
                {message && {message}}

          </div>
         
   

    );
};

export default Register;