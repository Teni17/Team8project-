import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React, { useContext } from 'react';
import { UserContext } from './contexts/UserContext.jsx';

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
import EditDonation from './pages/EditDonation.jsx'


const App = () =>{
    const { role } = useContext(UserContext); // role of the currently logged in user is always known with context
    
    if (role === null) {
        return <div>Loading...</div>; // Never happens but just in case
    }

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
                            element={<Home />}
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
                            path="/manage-inventory"
                            element={<ManageInventory />}
                        />
                        <Route 
                            path="/edit-donation/:id"
                            element={<EditDonation />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;