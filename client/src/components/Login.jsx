import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [oneTimeCode, setOneTimeCode] = useState('');
    const [message, setMessage] = useState('');
    const [twoFactorRequired, setTwoFactorRequired] = useState(false);
    const [userId, setUserId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!twoFactorRequired) {
            try {
                const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
                if (response.data.userId) {
                    setTwoFactorRequired(true);
                    setUserId(response.data.userId);
                    setMessage(response.data.message);
                } else {
                    setMessage(response.data.message);
                    localStorage.setItem('token', response.data.token);
                    window.location.href = '/dashboard';
                }
            } catch (error) {
                setMessage(error.response.data.message);
            }
        } else {
            try {
                const response = await axios.post('http://localhost:5000/api/users/verify-one-time-code', { userId, oneTimeCode });
                localStorage.setItem('token', response.data.token);
                window.location.href = '/dashboard';
            } catch (error) {
                setMessage(error.response.data.message);
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                {twoFactorRequired && (
                    <input
                        type="text"
                        placeholder="One-Time Code"
                        value={oneTimeCode}
                        onChange={(e) => setOneTimeCode(e.target.value)}
                    />
                )}
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;