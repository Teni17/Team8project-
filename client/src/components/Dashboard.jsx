import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/me', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setUserData(response.data);
            } catch (error) {
                setMessage('Failed to fetch user data');
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-bold text-center">Dashboard</h2>
                {message && <p className="text-center text-red-500">{message}</p>}
                {userData ? (
                    <div>
                        <p>Username: {userData.username}</p>
                        <p>Email: {userData.email}</p>
                        {/* Add more user-specific data here */}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;