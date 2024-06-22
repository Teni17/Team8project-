import { useEffect, useState } from 'react'
import InventoryDetails from '../components/InventoryDetails'
import { useNavigate } from 'react-router-dom'

const InventoryDisplay = () => {
    const [inventory, setInventory] = useState(null)
    const navigate = useNavigate() // navigate can route the application to a specific URL

    useEffect(() => {
        const fetchInventory = async () => {
            const response = await fetch('http://localhost:5050/donations')
            const json = await response.json()

            if (response.ok) {
                setInventory(json)
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
                    {inventory && inventory.map((food) => (
                        <InventoryDetails key={food._id} food={food} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default InventoryDisplay