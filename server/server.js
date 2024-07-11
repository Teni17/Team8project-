import express from "express";
import cors from "cors";
import dotenv from "dotenv" // to use process.env values
import donationRoutes from "../server/routes/Donationroutes.js" // get Donation router
import userRoutes from "../server/routes/userRoutes.js" // get User router
import reportRoutes from "../server/routes/reportRoutes.js" // get Report router

dotenv.config({ path: 'config.env'}) // load values from config.env into process.env

const PORT = process.env.PORT;
const MONGO_URI = process.env.ATLAS_URI;

// Initialize express app
const app = express();

app.use(cors());
app.use(express.json());

// middleware (code executed between getting a request and sending a response)
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/donations', donationRoutes)
app.use('/users', userRoutes)
app.use('/generate-report', reportRoutes)

// read certificate and private key
import fs from "fs"
import path from "path"
const privateKey = fs.readFileSync(path.join('key.pm'), 'utf8')
const certificate = fs.readFileSync(path.join('cert.pm'), 'utf8')
const credentials = { key: privateKey, cert: certificate }

// create HTTPS server
import https from "https"
const httpsServer = https.createServer(credentials, app)

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => {
        // to start the express server after connected to db
        httpsServer.listen(PORT, () => {
            console.log('HTTPS Server connected to database and listening on port', PORT);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });