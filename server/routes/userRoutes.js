import express from 'express';
import { registerUser, loginUser, verifyOneTimeCode, getCurrentUser } from '../controllers/userController.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-one-time-code', verifyOneTimeCode);
router.get('/me', auth, getCurrentUser);

// Example protected route that only admins can access
router.get('/admin-only-route', auth, isAdmin, (req, res) => {
    res.status(200).json({ message: 'Welcome, admin!' });
});

export default router;