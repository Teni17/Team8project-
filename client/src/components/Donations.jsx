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
        const response = await axios.post('/donations', post) //Need to fix this right here and still have more to add

        setFood('')
        setDate('')
        setQuanity('')
        setError(null)
        console.log('New Donation', response.data)
    }
    catch(error){
        console.error('Error Axios fault, error')
        setError(error.respoine?.data?.error || 'Failed to create Donation')
    }

}

   
 

    const handleDonationAdd = () => {
        setDonationList([...donationList,{ food: "", date: "", quanity: ""}])
    }


    const handleDonation = (e, index) =>{
        const { setFood } = e.target
        const { setDate } = e.target
        const updatedDonations = donationList.map((post, i) =>
        i === index ? { ... post, food: setFood, date: setDate } : post)
        setDonationList(updatedDonations)
    }


    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Create New Donation</h3>
            <label>Donation</label>
            <input
            type="text"
            onChange={(e) => setFood(e.target.value)}
            value={food}
            />
    
            <label> Exp Date</label>
            <input
            type="text"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            />

            <label>Quanity</label>
            <input
            type="text"
            onChange={(e) => setQuanity(e.target.value)}
            value={quanity}
            />
    
            <button type="Submit">Submit</button>

        {donationList.map((post, index) =>
            <div key={index} className="donations">
                <input
                value={post.create}
                onChange={(e) =>handleDonation(e, index)}
                />
        {donationList.length - 1 === index && donationList.length < 100 &&
           <button
           type="button"
           className="add"
           onClick={handleDonationAdd}
           ></button>
        }


        </div>

        
        )}
        
            {error && <div className="error"> {error}</div>}
        </form>
        
        
    )
    

}



export default DonationForm