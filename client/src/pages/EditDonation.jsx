import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditDonation = () => {
    const { id } = useParams();
    const [donation, setDonation] = useState(null);
    const [name, setName] = useState('');
    const [donor, setDonor] = useState('');
    const [date, setDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [comments, setComments] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDonation = async () => {
            try {
                const response = await fetch(`https://localhost:5050/donations/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setDonation(data);
                    setName(data.name);
                    setDonor(data.donor);
                    setDate(data.date);
                    setQuantity(data.quantity);
                    setCategory(data.category);
                    setComments(data.comments);
                } else {
                    console.error('Failed to fetch donation:', response);
                }
            } catch (error) {
                console.error('Error fetching donation:', error);
            }
        };

        fetchDonation();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedDonation = { name, donor, date, quantity, category, comments };
        try {
            const response = await fetch(`https://localhost:5050/donations/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedDonation),
            });
            if (response.ok) {
                navigate('/manage-inventory');
            } else {
                console.error('Failed to update donation:', response);
            }
        } catch (error) {
            console.error('Error updating donation:', error);
        }
    };

    if (!donation) return <div>Loading...</div>;

    return (
        <form className="edit-donation" onSubmit={handleSubmit}>
            <h2>Edit Donation</h2>
            <label>Donation:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            <label>Donor:</label>
            <input type="text" value={donor} onChange={(e) => setDonor(e.target.value)} required />
            <label>Category:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="Food">Food</option>
                <option value="Hygiene">Hygiene</option>
                <option value="Miscellaneous">Miscellaneous</option>
            </select>
            <label>Quantity:</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
            <label>Expiry Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <label>Comments:</label>
            <input type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
            <button type="submit">Update</button>
        </form>
    );
};

export default EditDonation;
