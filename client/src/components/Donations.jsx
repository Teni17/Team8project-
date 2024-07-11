import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DonationForm = () =>{
    const [name, setName] = useState('')
    const [donor, setDonor] = useState('')
    const [date, setDate] = useState('')
    const [quantity, setQuantity] = useState('')
    const [category, setCategory] = useState('')
    const [comments, setComments] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()


    const handleSubmit = async(e) => {
        e.preventDefault()

        const donation = { name, donor, date, quantity, category, comments }

        console.log('Attempting to add new Donation:', JSON.stringify(donation))
        const response = await fetch('https://localhost:5050/donations', {
            method: 'POST',
            body: JSON.stringify(donation),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const Json = await response.json

        if (!response.ok) {
            setError(Json.error)
        }
        else {
            setName('')
            setDonor('')
            setDate('')
            setQuantity('')
            setCategory('')
            setComments('')
            setError(null)
            console.log('New Donation', Json)
        }
    }

    const handleHomeClick = () => {
        navigate('/home')
    }


    return(
        <form className="create" onSubmit={handleSubmit}>
            <div className="Header">
            <h1>Create New Donation</h1>
            </div>
            

            <div className="Content">
            <label>Donation: </label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <label>Donor: </label>
            <input
                type="text"
                value={donor}
                onChange={(e) => setDonor(e.target.value)}
                required
            />

            <label>Category: </label>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            >
                <option value="" disabled>Select a category</option>
                <option value="Food">Food</option>
                <option value="Hygiene">Hygiene</option>
                <option value="Miscellaneous">Miscellaneous</option>
            </select>

            <label>Quantity: </label>
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
            />

            <label>Expiry Date: </label>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />

            <label>Comments (optional): </label>
            <input
                type="text"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
            />

            </div>
           <div className="Buttons">
            <button>Submit</button>
            <button ClassName="Home" onClick={handleHomeClick}>Home</button>
           </div>
            {error && <div className="error">{error}</div>}
        </form>   
    )
}


export default DonationForm