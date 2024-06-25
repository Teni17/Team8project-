import nodemailer from 'nodemailer';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail', // or use another email service
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const registerUser = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ username, password: hashedPassword, email });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate a one-time code and send it to the user's email
        const oneTimeCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
        user.oneTimeCode = oneTimeCode;
        user.oneTimeCodeExpiry = Date.now() + 300000; // Code expires in 5 minutes
        await user.save();

        // Send email with one-time code
        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Your One-Time Code for Login',
            text: `Your one-time code is: ${oneTimeCode}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Failed to send email' });
            } else {
                return res.status(200).json({ message: 'One-time code sent to your email', userId: user._id });
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const verifyOneTimeCode = async (req, res) => {
    const { userId, oneTimeCode } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.oneTimeCode !== oneTimeCode || Date.now() > user.oneTimeCodeExpiry) {
            return res.status(400).json({ message: 'Invalid or expired one-time code' });
        }

        user.oneTimeCode = null; // Clear the one-time code
        user.oneTimeCodeExpiry = null;
        await user.save();

        const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ result: user, token });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export { registerUser, loginUser, verifyOneTimeCode };