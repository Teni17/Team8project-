import { useEffect, useState } from 'react'
import InventoryDetails from '../components/InventoryDetails'
import { useNavigate } from 'react-router-dom'

const InventoryDisplay = () => {
    const [donations, setDonations] = useState([])
    const [filteredDonations, setFilteredDonations] = useState([])
    const [search, setSearch] = useState('')
    const navigate = useNavigate() // navigate can route the application to a specific URL

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('https://localhost:5050/donations')

                if (response.ok) {
                    const data = await response.json()
                    setDonations(data)
                    setFilteredDonations(data)
                } else {
                    console.error('Failed to fetch inventory:', json)
                }
            } catch (error) {
                console.error('Error fetching inventory:', error)
            }
        }

        fetchInventory()
    }, [])

    const handleHomeClick = () => {
        navigate('/home')
    }
    const filterDonations = (category) =>{
        const filtered = donations.filter(donation => donation.category === category)
        setFilteredDonations(filtered)
    }
    const filterNames = e =>{
        const searchValue = e.target.value.toLowerCase()
        setSearch(searchValue)
        const filtered = donations.filter(donation => donation.name.toLowerCase().includes(searchValue))
        setFilteredDonations(filtered)
    }
  

    return (
        <div className="inventory-display">
            <div className="header">
                <h2>Inventory</h2>
                <button onClick={handleHomeClick}>Home</button>
                <button onClick={() => filterDonations('Food')}>Filter Food</button>
                <button onClick={() => filterDonations('Hygiene')}>Filter Hygiene</button>
                <button onClick={() => filterDonations('Miscellaneous')}>Filter Miscellaneous</button>
                <button onClick={() => setFilteredDonations(donations)}>All</button>
            </div>
            <div className="inventory-container">
            <input type='text' placeholder='Search by Name' value={search} onChange={filterNames} />
                <div className="inventory-list">
                    {filteredDonations.map((donation) => (
                        <InventoryDetails key={donation._id} donation={donation} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default InventoryDisplay