import mongoose from "mongoose"
import { Donation } from "../models/Donationmodel.js"

//get all Donations
export const getDonations = async(req, res) => {
    const donations = await Donation.find({}).sort({createdAt: -1})

    res.stus(200).json(donations)
}


//create a new Donation
export const createDonation = async(req, res) =>{
    const{food, date} = req.body

    try{
        const donation = await Donation.create({food, date})
        const savedDonation = await donation.save()
        res.status(200).json({ donation: donation._id })
    }catch(error){
        res.status(400).json({error: error.message})
    }

}

//delete Donation
export const deleteDonation = async(req, res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Donation'})
    }

    const donation = await Donation.findOneAndDelete({_id: id})

    if(!donation){
        return res.status(400).json({error: 'No such Donation'})
    }
    res.status(200).json(donation)
}

//update a donation
export const updateDonation = async(req, res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Donation'})
    }

    const donation = await Donation.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!donation){
        return res.status(400).json({error: "No such Donation"})
    }
    res.status(200).json(donation)
}