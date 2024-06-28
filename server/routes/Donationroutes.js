import express from 'express';
import { createDonation, deleteDonation, getDonations } from '../controllers/Donationcontroller.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createDonation);
router.delete('/:id', auth, isAdmin, deleteDonation);
router.get('/', auth, getDonations);

export default router;