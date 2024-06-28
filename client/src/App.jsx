import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import Dashboard from './components/Dashboard.jsx';
import VerifyCode from './components/VerifyCode.jsx';

const decodeToken = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error('Invalid token:', e);
        return null;
    }
};

const App = () => {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = decodeToken(token);
            setRole(decodedToken?.role || 'user');
        }
    }, []);

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<h1 className="text-4xl text-center mt-8">Welcome to the App</h1>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify-code/:userId" element={<VerifyCode />} />
                    <Route path="/admin" element={role === 'admin' ? <AdminPanel /> : <Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;