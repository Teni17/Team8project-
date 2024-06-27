import {useState} from "react";
import axios from "axios"
const DonationForm = () =>{
    const [food, setFood] = useState('')
    const [date, setDate] = useState('')
    const [quantity, setQuantity] = useState('')
    const [error, setError] = useState(null)
    const [donationList, setDonationList] = useState([{food: "", date: "", quantity: ""}])



    const handleSubmit = async(e) =>
    {
        e.preventDefault()

        const post = {
        food,
        date,
        quantity: parseInt(quantity),
    }
    try{
        const response = await fetch('http://localhost:5050/donations', {
            method: 'POST',
            body: JSON.stringify({donationList}),
            headers: {
                'Content-Type': 'application/json',
            },
            
        });

    



        setFood('')
        setDate('')
        setQuantity('')
        setError(null)
        setDonationList([{id: Date.now(), food:"" , quantity:0, date: ""}])
        console.log('New Donation', response.data)
    }
    catch(error){
        console.error(error)
        setError(error.response?.data?.error || 'Failed to create Donation')
    }

}

   
 

    const handleDonationAdd = () => {
        setDonationList([...donationList,{ id: Date.now(), food: "", quantity: "", date: "",}])
    }


    const handleDonation = (e, index) =>{
        const { name ,value, quantity } = e.target
        const updatedDonations = donationList.map((donation, i) =>
        i === index ? { ... donation, [name]: value, [date]: value, [quantity]: Number(value)} : donation)
        setDonationList(updatedDonations)
    }


    return(
        <form className="create" onSubmit={handleSubmit}>
        <h1>Create New Donation</h1>

        {donationList.map((post, index) =>
        (
            <div key={post.id} className="donations">
            <label>Donation</label>
            <input
            name="food"
            value={post.food}
            onChange={(e) => handleDonation(e , index)}
            />
            <label>Quantity</label>
            <input
            name="quantity"
            value={post.quantity}
            type="number"
            onChange={(e) => handleDonation(e, index)}
            />
            <label>Date</label>
            <input
            name="date"
            value={post.date}
            onChange={(e) => handleDonation(e, index)}
            />

            </div>

        )
        
        )}
        <button type="button" onClick={handleDonationAdd}> 
        Add
        </button>
            <button type="submit">Submit</button>



            {error && <div className="error">{error}</div>}
        </form>
        
       
        
    )
    

}


export default DonationForm