// The router we create in this file is exported to the server.js file
// We are providing this router with different routes (get, delete, etc.) for different URLS

const express = require('express')

// import controllers (controllers hold database logic, keeps this file clean)
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

// create empty router, subsequent routes are added to the router
const router = express.Router()

// GET all workouts
router.get('/', getWorkouts)

// GET a single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

// export router to be used in server.js
module.exports = router