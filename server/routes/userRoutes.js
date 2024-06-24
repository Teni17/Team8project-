import express from 'express';
import { registerUser, loginUser, getUsers } from '../controllers/userController.js';

const express = require('express');
const { registerUser, loginUser, verifyOneTimeCode } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-one-time-code', verifyOneTimeCode);

module.exports = router;