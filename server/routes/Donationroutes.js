import express from "express"
import { createDonation, getDonations, getDonation, deleteDonation, updateDonation } from "../controllers/Donationcontroller.js"

// create empty router
const router = express.Router()

// POST a new Donation
router.post("/", createDonation)

// GET all Donations
router.get("/", getDonations)

// GET a Donation
router.get("/:id", getDonation)

// DELETE a Donation
router.delete("/:id", deleteDonation)

// UPDATE a Donation
router.patch("/:id", updateDonation)

// export router to be used in server.js
export default router;