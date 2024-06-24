import React from 'react';
import '../index.css';

const Home = () => {
    return (
        <div className="home">
            <h2>Home</h2>
            <button onClick={() => console.log('Add Donation clicked')}>Add Donation</button>
            <button onClick={() => console.log('View Inventory clicked')}>View Inventory</button>
            <button onClick={() => console.log('Generate Report clicked')}>Generate Report</button>
        </div>
    );
}

export default Home;
