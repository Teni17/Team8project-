import {useState} from "react";
import axios from "axios"
const DonationForm = () =>{
    const [food, setFood] = useState('')
    const [date, setDate] = useState('')
    const [quanity, setQuanity] = useState('')
    const [error, setError] = useState(null)
    const [donationList, setDonationList] = useState([{food: "", date: "", quanity: ""}])



    const handleSubmit = async(e) =>
    {
        e.preventDefault()

        const post = {
        food,
        date,
        quanity,
    }
    try{
        const response = await axios.post('/donations', donationList) //Need to fix this right here and still have more to add

        setFood('')
        setDate('')
        setQuanity('')
        setError(null)
        setDonationList([{id: Date.now(), food:"" , quanity:"", daate: ""}])
        console.log('New Donation', response.data)
    }
    catch(error){
        console.error('Error Axios fault, error')
        setError(error.respoine?.data?.error || 'Failed to create Donation')
    }

}

   
 

    const handleDonationAdd = () => {
        setDonationList([...donationList,{ id: Date.now(), food: "", quanity: "", date: "",}])
    }


    const handleDonation = (e, index) =>{
        const { name ,value } = e.target
        const updatedDonations = donationList.map((donation, i) =>
        i === index ? { ... donation, [name]: value} : donation)
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
            <label>Quanity</label>
            <input
            name="quanity"
            value={post.quanity}
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