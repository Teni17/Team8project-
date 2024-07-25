import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const VerifyCode = () => {
    const [oneTimeCode, setOneTimeCode] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { userId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:5050/users/verify-one-time-code', {
                userId,
                oneTimeCode,
            });
            setMessage(response.data.message);
            if (response.status === 200) {
                const { token, result } = response.data;
                localStorage.setItem('token', token);
                navigate('/home');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to verify code');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-bold text-center">Verify Code</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="One-Time Code"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={oneTimeCode}
                        onChange={(e) => setOneTimeCode(e.target.value)}
                    />
                    <button type="submit" className="w-full px-3 py-2 text-white bg-blue-600 rounded-md">
                        Verify
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default VerifyCode;