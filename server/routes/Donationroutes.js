import express from "express"
import { createDonation, getDonations, deleteDonation, updateDonation } from "/Users/adamelmobdy/Documents/CPTS 322 Project/Team8project-/server/controllers/Donationcontroller.js"

const router = express.Router()

router.post("/", createDonation)

router.get("/",getDonations)

router.delete("/:id", deleteDonation)

router.patch("/:id", updateDonation)

export default router;