import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext'
import image from "/Users/adamelmobdy/Desktop/eight.png"

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { setRoleAndToken } = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:5050/users/login', {
                username,
                password,
            });
            setMessage(response.data.message);
            if (response.status === 200) {
                const { token, userId, role } = response.data;
                // localStorage.setItem('token', token);
                console.log(response.data)
                console.log(token, userId, role)
                if (token) setRoleAndToken(token) // use context if normal user
                if (role === 'admin') {
                    navigate(`/verify-code/${userId}`);
                } else {
                    navigate('/home');
                }
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to login');
        }
    };

    return (
       <div className='Login'>
        <div className='title'>
        <h2 >Login</h2>

        </div>
            
                {message && <p >{message}</p>}
                <form className='Items' onSubmit={handleSubmit}>
                <img className='Image' src={image}></img>
                    <div className='itemone'>
                    <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                    </div>
                        
             
                    <div className='item3'>
                    <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            
                        />
                    </div>
                       
                 
                    <button className='login'type="submit">
                        Login
                    </button>
                </form>

       </div>
           
            

    );
};

export default Login;
