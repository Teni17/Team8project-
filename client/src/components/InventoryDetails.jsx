import formatDistanceToNow from 'date-fns/formatDistanceToNow' // date formatting

const InventoryDetails = ({ food }) => {
    return (
        <div className="inventory-details">
            <h4>{food.food}</h4>
            <p><strong>Expiration Date: </strong>{food.date}</p>
            <p>{formatDistanceToNow(new Date(food.createdAt), { addSuffix: true })}</p>
        </div>
    )
}

export default InventoryDetails