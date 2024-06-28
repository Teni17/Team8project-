import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import donationRoutes from "../server/routes/Donationroutes.js";
import userRoutes from "../server/routes/userRoutes.js";
import mongoose from "mongoose";

dotenv.config({ path: 'config.env' });

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.ATLAS_URI;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/donations', donationRoutes);
app.use('/api/users', userRoutes);

mongoose.connect(MONGODB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log('Server connected to database and listening on port', PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });