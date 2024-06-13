const mongoose = require('mongoose')

// A Schema defines the structure of a document inside our database
const Schema = mongoose.Schema

// Creates a Schema for workouts that requires a String title, a Number reps, and a Number load
const workoutSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true })

// Creates/exports a model using the above Schema to be used by controllers
module.exports = mongoose.model('Workout', workoutSchema)