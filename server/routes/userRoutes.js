import express from 'express';
import { registerUser, loginUser, verifyOneTimeCode , getCurrentUser} from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-one-time-code', verifyOneTimeCode);
router.get('/me', auth, getCurrentUser);
export default router;
