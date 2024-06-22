import React from 'react';
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate() // navigate can route the application to a specific URL

    const handleViewInventoryClick = () => {
        navigate('/inventory-display')
    }

    return (
        <div className="home">
            <h2>Home</h2>
            <button onClick={() => console.log('Add Donation clicked')}>Add Donation</button>
            <button onClick={handleViewInventoryClick}>View Inventory</button>
            <button onClick={() => console.log('Generate Report clicked')}>Generate Report</button>
        </div>
    );
}

export default Home;
