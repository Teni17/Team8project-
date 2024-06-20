import express from 'express';
import { registerUser, loginUser, getUsers } from '../controllers/userController.js';

// create empty router
const router = express.Router();

// POST a new User
router.post('/register', registerUser);

// GET an existing User for login
router.get('/login', loginUser);

// GET all Users (for debugging purposes)
router.get('/', getUsers);

// export router to be used in server.js
export default router;