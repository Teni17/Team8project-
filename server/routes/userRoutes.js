import express from 'express';
import { registerUser, loginUser, verifyOneTimeCode } from '../controllers/userController.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-one-time-code', verifyOneTimeCode);

export default router;
