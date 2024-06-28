import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [donations, setDonations] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchDonations = async () => {
            const result = await axios.get('http://localhost:5000/api/donations', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setDonations(result.data);
        };
        fetchDonations();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/donations/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setDonations(donations.filter(donation => donation._id !== id));
            setMessage('Donation deleted successfully');
        } catch (error) {
            setMessage('Failed to delete donation');
        }
    };

    return (
        <div>
            <h2>Admin Panel</h2>
            {message && <p>{message}</p>}
            <ul>
                {donations.map(donation => (
                    <li key={donation._id}>
                        {donation.item} - {donation.quantity}
                        <button onClick={() => handleDelete(donation._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;