import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InventoryDetails from '../components/InventoryDetails';

const ManageInventory = () => {
    const [donations, setDonations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('https://localhost:5050/donations');
                if (response.ok) {
                    const data = await response.json();
                    setDonations(data);
                } else {
                    console.error('Failed to fetch inventory:', response);
                }
            } catch (error) {
                console.error('Error fetching inventory:', error);
            }
        };

        fetchInventory();
    }, []);

    const handleEdit = (id) => {
        navigate(`/edit-donation/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://localhost:5050/donations/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setDonations(donations.filter((donation) => donation._id !== id));
            } else {
                console.error('Failed to delete donation:', response);
            }
        } catch (error) {
            console.error('Error deleting donation:', error);
        }
    };

    return (
        <div className="manage-inventory">
            <div className="header">
                <h2>Manage Inventory</h2>
            </div>
                <button className='Home-Button' onClick={() => navigate('/home')}>Home</button>
            
            <div className="inventory-list">
                {donations.map((donation) => (
                    <div key={donation._id} className="inventory-item">
                        <InventoryDetails donation={donation} />
                        <button onClick={() => handleEdit(donation._id)}>Edit</button>
                        <button onClick={() => handleDelete(donation._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageInventory;
