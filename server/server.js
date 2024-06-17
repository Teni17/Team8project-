import express from "express";
import cors from "cors";
import dotenv from "dotenv" // to use process.env values
dotenv.config({ path: 'config.env'}) // load values from config.env into process.env

//Going to use this to import routes


const PORT = process.env.PORT;
const MONGODB_URI = process.env.ATLAS_URI;


const app = express();

app.use(cors());
app.use(express.json());
//used to sue the imported things

//routes

//connect to database with mongoose
import mongoose from "mongoose"
mongoose.connect(MONGODB_URI)
    .then(() => {
        //Used to start the express server
        app.listen(PORT, () => {
            console.log('Server connected to database and listening on port', PORT);
        });
    })
    .catch((error) => {
        console.log(error)
    })




