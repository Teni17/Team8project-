import mongoose from "mongoose"


const DonationSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    donor:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        enum: ['Food', 'Hygiene', 'Miscellaneous'],
        required: true
    },
    comments:{
        type: String,
        default: '' // comments are optional, so default to empty string
    }

}, {timestamps: true})

export const Donation = mongoose.model('Donation', DonationSchema)
