import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// register new User
export const registerUser = async (req, res) => {
    // get new User info
    const { username, password } = req.body;

    try {
        // check if username is unique
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // encrypt password
        const hashedPassword = await bcrypt.hash(password, 12);

        // create new User
        const newUser = new User({ username, password: hashedPassword });

        await newUser.save();

        // send response containing success message
        res.status(200).json({ message: 'User registered successfully' });
    } catch (err) {
        // send response containing error message
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// login existing User
export const loginUser = async (req, res) => {
    // get existing User info
    const { username, password } = req.body;

    try {
        // check valid User
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // decrypt and check valid password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        // get jsonwebtoken
        const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // send response containing user and token
        res.status(200).json({ result: user, token });
    } catch (err) {
        // send response containing error message
        res.status(500).json({ error: err.message });
    }
};

// get all Users (for debugging purposes)
export const getUsers = async(req, res) => {
    // get Users
    const users = await User.find({}).sort({createdAt: -1})

    // send response containing all Users
    res.status(200).json(users)
}