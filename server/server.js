import express from "express";
import cors from "cors";
import dotenv from "dotenv" // to use process.env values
dotenv.config({ path: 'config.env'}) // load values from config.env into process.env


// .env values
const PORT = process.env.PORT;
const MONGODB_URI = process.env.ATLAS_URI;

// initialize express app
const app = express();

// to use the imported things
app.use(cors());
app.use(express.json());

// routes

// connect to database with mongoose
import mongoose from "mongoose"
mongoose.connect(MONGODB_URI)
    .then(() => {
        // to start the express server after connected to db
        app.listen(PORT, () => {
            console.log('Server connected to database and listening on port', PORT);
        });
    })
    .catch((error) => {
        console.log(error)
    })




