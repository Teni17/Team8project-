import {useState} from "react";

const DonationForm = () =>{
    const [food, setFood] = useState('')
    const [date, setDate] = useState('')
    const [quantity, setQuantity] = useState('')
    const [error, setError] = useState(null)


    const handleSubmit = async(e) => {
        e.preventDefault()

        const donation = { food, date, quantity }

        const response = await fetch('http://localhost:5050/donations', {
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
            setFood('')
            setDate('')
            setQuantity('')
            setError(null)
            console.log('New Donation', Json)
        }
    }


    return(
        <form className="create" onSubmit={handleSubmit}>
            <h1>Create New Donation</h1>

            <label>Donation:</label>
            <input
                type="text"
                value={food}
                onChange={(e) => setFood(e.target.value)}
            />

            <label>Date:</label>
            <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <label>Quantity:</label>
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />

            <button>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>   
    )
}


export default DonationForm