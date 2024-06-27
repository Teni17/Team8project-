import { useEffect, useState } from 'react'
import InventoryDetails from '../components/InventoryDetails'
import { useNavigate } from 'react-router-dom'

const InventoryDisplay = () => {
    const [inventory, setInventory] = useState(null)
    const navigate = useNavigate() // navigate can route the application to a specific URL

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('https://localhost:5050/donations')
                const json = await response.json()

                if (response.ok) {
                    setInventory(json)
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

    return (
        <div className="inventory-display">
            <div className="header">
                <h2>Inventory</h2>
                <button onClick={handleHomeClick}>Home</button>
            </div>
            <div className="inventory-container">
                <div className="inventory-list">
                    {inventory && inventory.map((donation) => (
                        <InventoryDetails key={donation._id} donation={donation} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default InventoryDisplay