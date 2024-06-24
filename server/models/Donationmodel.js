import mongoose from "mongoose"


const DonationSchema = mongoose.Schema({
    // name of the food in the donation
    food:{
        type: String,
        required: true
    },
    // expiration date of the donation
    date:{
        type: String,
        required: true
    },

}, {timestamps: true})


export const Donation = mongoose.model('Donation', DonationSchema)