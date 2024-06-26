import mongoose from "mongoose"


const DonationSchema = mongoose.Schema({
    food:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },

}, {timestamps: true})

export const Donation = mongoose.model('Donation', DonationSchema)