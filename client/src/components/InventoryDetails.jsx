import formatDistanceToNow from 'date-fns/formatDistanceToNow' // date formatting

const InventoryDetails = ({ donation }) => {
    // some of the donation names are under .food and some are under .name since the Schema change
    const donationName = donation.name || donation.food

    // some of the date attributes are strings, this converts them to a Date object if necessary
    const expirationDate = typeof donation.date === 'string' ? new Date(donation.date) : donation.date

    return (
        <div className="inventory-details">
            <h4>{donationName}</h4>
            <p><strong>Donor: </strong>{donation.donor}</p>
            <p><strong>Item: </strong>{donation.name}</p>
            <p><strong>Category: </strong>{donation.category}</p>
            <p><strong>Quantity: </strong>{donation.quantity}</p>
            <p><strong>Expires: </strong>{expirationDate.toLocaleDateString('en-US', { // format Date object
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}</p>
            {donation.comments && ( // only display comments if they exist
                <p><strong>Comments: </strong>"{donation.comments}"</p>
            )}
            <p>{formatDistanceToNow(new Date(donation.createdAt), { addSuffix: true })}</p>
        </div>
    )
}

export default InventoryDetails