import React from 'react';
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate() // navigate can route the application to a specific URL

    const handleViewInventoryClick = () => {
        navigate('/inventory-display')
    }

    const handleGenerateReportClick = () => {
        navigate('/generate-report')
    }

    return (
        <div className="home">
            <h4>Home</h4>
            <button onClick={() => console.log('Add Donation clicked')}>Add Donation</button>
            <button onClick={handleViewInventoryClick}>View Inventory</button>
            <button onClick={handleGenerateReportClick}>Generate Report</button>
        </div>
    );
}

export default Home;
