import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import db from "./db/connection.js"
import donationRoutes from "../server/routes/Donationroutes.js"
//Going to use this to import routes

dotenv.config()

const PORT = process.env.PORT || 5050;
const MONGODB_URI = process.env.ATLAS_URI;


const app = express();

app.use(cors());
app.use(express.json());

//used to sue the imported things

//routes
app.use('/donations', donationRoutes)

//Used to start the express server
app.listen(PORT, () => {
    console.log('Server listening on port ${PORT}');
});


