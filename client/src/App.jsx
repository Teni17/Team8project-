import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

// pages and components
import Home from './pages/Home'
import InventoryDisplay from './pages/InventoryDisplay';
import GenerateReport from './pages/GenerateReport';
import Donation from './components/Donations.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import VerifyCode from './components/VerifyCode.jsx';
import Display from './pages/Display.jsx';
import ManageInventory from './pages/ManageInventory.jsx';

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


const App = () =>{
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = decodeToken(token);
            setRole(decodedToken?.role || 'user');
        }
    }, []);

    return(
        <div className="App">
            <BrowserRouter>
                <div className="pages">
                    <Routes>
                        <Route
                            path="/"
                            element={<Display />}
                        />
                        <Route
                            path="/home"
                            element={<Home role={role} />}
                        />
                        <Route
                            path="/inventory-display"
                            element={<InventoryDisplay />}
                        />
                        <Route
                            path="/generate-report"
                            element={<GenerateReport />}
                        />
                        <Route 
                            path="/DonationForm" 
                            element={<Donation />}
                        />
                        <Route
                            path="/login"
                            element={<Login />}
                        />
                        <Route
                            path="/register"
                            element={<Register />}
                        />
                        <Route
                            path="/verify-code/:userId"
                            element={<VerifyCode />}
                        />
                        <Route
                            path="/admin"
                            element={role === 'admin' ? <Home /> : <Navigate to="/home" />}
                        />
                        <Route
                            path="/manage-inventory"
                            element={<ManageInventory />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;