import {useState} from "react";
import axios from "axios"
const DonationForm = () =>{
    const [food, setFood] = useState('')
    const [date, setDate] = useState('')
    const [error, setError] = useState(null)



    const handleSubmit = async(e) =>{
        e.preventDefault()

        const post = {title, entry:
        food,
        date,
    }}


    try{
        const response = await axios.get('/donations') //Need to fix this right here and still have more to add

        setFood('')
        setDate('')
        setError(null)
        console.log('New Donation', response.data)
    }
    catch(error){
        console.error('Error Axios fault, error')
        setError(error.respoine?.data?.error || 'Failed to create Donation')
    }
    
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Create New Donation</h3>
            <label>Post</label>
            <input
            type="text"
            onChange={(e) => setFood(e.target.value)}
            value={food}
            />
    
            <label>Date</label>
            <input
            type="text"
            onChange={(e) => setDate(e.target.value)}
            value={make}
            />
    
            <button>ADD</button>
            {error && <div className="error"> {error}</div>}
        </form>
    )    
}





export default DonationForm