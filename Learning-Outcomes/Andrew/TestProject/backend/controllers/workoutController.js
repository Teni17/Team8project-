// import Workout model
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    // get all workouts from mongoose Workout model, sorted by creation date (-1)
    const workouts = await Workout.find({}).sort({createdAt: -1})

    // send response with status 200 of json with all workouts
    res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
    // get id number from the request parameter
    const { id } = req.params

    // check that id is a valid mongoose id. otherwise, will search with invalid id and crash
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    // search and get the workout by id
    const workout = await Workout.findById(id)

    // if the search failed for whatever reason, send error message. otherwise, would crash
    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    // send response with status 200 of json with the workout
    res.status(200).json(workout)
}

// create new workout
const createWorkout = async (req, res) => {
    // get workout info from the request body
    const {title, load, reps} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    // add document to database
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        // if error occurs, send message
        res.status(400).json({error: error.message, emptyFields})
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    // get id number from request parameter
    const { id } = req.params

    // check that the id number is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    // find and delete the workout with the id number
    const workout = await Workout.findOneAndDelete({_id: id})

    // if failed, send error message
    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    // send response containing the workout that was just deleted
    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
    // get id number from request parameter
    const { id } = req.params

    // check that the id number is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    // find and update the workout in the database with the request body
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    // if failed, send error message
    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    // send response of the workout changed (without the changes)
    res.status(200).json(workout)
}

// export the controllers to be used by the router
module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}