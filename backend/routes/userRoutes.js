const express = require('express');
const router = express.Router();
const { addUser, getAllUsers, getUser } = require('../controllers/userController');

// Add user
router.post('/user', addUser);

// Get all users
router.get('/users', getAllUsers);

// Get a single user
router.get('/user/:userId', getUser);


module.exports = router;
