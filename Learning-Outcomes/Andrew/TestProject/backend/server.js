require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// express app
const app = express()

// middleware (code executed between getting a request and sending a response)
app.use(express.json()) // checks all requests to see if there is data being sent to server.
                        // if it does, then it passes and attaches it to the request object (req)

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// import router (routes are predefined rules telling the router how to respond to a URL)
app.use('/api/workouts', workoutRoutes)

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => { // executes once connected
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to database and listening on port', process.env.PORT)
        })
    })
    .catch((error) => { // catch and log errors if they occur
        console.log(error)
    })
