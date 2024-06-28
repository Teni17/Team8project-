import Donation from '../models/Donationmodel.js';

export const createDonation = async (req, res) => {
    const { item, quantity, expirationDate } = req.body;
    try {
        const newDonation = new Donation({ item, quantity, expirationDate });
        await newDonation.save();
        res.status(201).json(newDonation);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const deleteDonation = async (req, res) => {
    const { id } = req.params;
    try {
        await Donation.findByIdAndDelete(id);
        res.status(204).json({ message: "Donation deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getDonations = async (req, res) => {
    try {
        const donations = await Donation.find();
        res.status(200).json(donations);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};