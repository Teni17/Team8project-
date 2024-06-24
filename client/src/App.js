import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<h1>Welcome to the App</h1>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<h2>Dashboard</h2>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;