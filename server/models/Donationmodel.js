import mongoose from 'mongoose';

const DonationSchema = mongoose.Schema({
    // Name of the food in the donation
    food: {
        type: String,
        required: true
    },
    // Expiration date of the donation
    date: {
        type: Date,  // Changed to Date type for better date handling
        required: true
    },
}, { timestamps: true });

const Donation = mongoose.model('Donation', DonationSchema);

export default Donation;