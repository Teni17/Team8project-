import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import donationRoutes from './routes/Donationroutes.js'; // Adjust the path if necessary
import userRoutes from './routes/userRoutes.js'; // Adjust the path if necessary

dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'your_default_mongodb_uri';

// Initialize express app
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/donations', donationRoutes);
app.use('/api/users', userRoutes);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => {
        // Start the express server after connected to db
        app.listen(PORT, () => {
            console.log(`Server connected to database and listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });