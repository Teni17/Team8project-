import mongoose from "mongoose"
import { Donation } from "../models/Donationmodel.js"

// get all Donations
export const getDonations = async(req, res) => {
    // get Donations
    const donations = await Donation.find({}).sort({createdAt: -1})

    // send response containing all donations
    res.status(200).json(donations)
}


// create a new Donation
export const createDonation = async(req, res) =>{
    // get new Donation info
    const{name, donor, date, quantity, category, comments} = req.body

    try{
        // create Donation
        const donation = await Donation.create({name, donor, date, quantity, category, comments})

        // send response containing id of new Donation
        res.status(200).json({ donation: donation._id })
    }catch(error){
        // send response containing error message
        res.status(400).json({error: error.message})
    }

}

// delete a Donation
export const deleteDonation = async(req, res) =>{
    // get Donation id
    const { id } = req.params

    // check valid id type
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Donation'})
    }

    // delete Donation
    const donation = await Donation.findOneAndDelete({_id: id})

    // check valid Donation
    if(!donation){
        return res.status(404).json({error: 'No such Donation'})
    }

    // send response containing deleted Donation
    res.status(200).json(donation)
}

// update a donation
export const updateDonation = async(req, res) =>{
    // get Donation id
    const { id } = req.params

    // chack valid id type
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Donation'})
    }

    // update Donation
    const donation = await Donation.findOneAndUpdate({_id:id},{
        ...req.body
    })

    // check valid Donation
    if(!donation){
        return res.status(400).json({error: "No such Donation"})
    }

    // send response containing updated Donation (without the update)
    res.status(200).json(donation)
}
