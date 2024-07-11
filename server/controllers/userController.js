import nodemailer from 'nodemailer';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Ensure environment variables are loaded

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const registerUser = async (req, res) => {
    const { username, password, email, role } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ username, password: hashedPassword, email, role });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error in registerUser:', err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.error('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            console.error('Invalid credentials');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (user.role === 'admin') {
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
                    console.error('Error sending email:', error); // Log the specific error
                    return res.status(500).json({ message: 'Failed to send email' });
                } else {
                    console.log('Email sent: ' + info.response);
                    return res.status(200).json({ message: 'One-time code sent to your email', userId: user._id, role: user.role });
                }
            });
        } else {
            const token = jwt.sign({ username: user.username, id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ result: user, token, role: user.role });
        }
    } catch (err) {
        console.error('Error in loginUser:', err); // Log any other errors
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

        const token = jwt.sign({ username: user.username, id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ result: user, token });
    } catch (err) {
        console.error('Error in verifyOneTimeCode:', err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password -oneTimeCode -oneTimeCodeExpiry');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        console.error('Error in getCurrentUser:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export { registerUser, loginUser, verifyOneTimeCode, getCurrentUser };
