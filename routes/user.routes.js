// user.routes.js

const express = require('express');
const router = express.Router();
const { loginUser, registerUser, updateUser, deleteUser, addUser, getUsers } = require('../controllers/user.controller');

// Define routes with callback functions
router.post('/login', loginUser); // Define a POST route for user login
router.post('/register', registerUser); // Define a POST route for user registration
router.get('/GetUsers', getUsers); // Define a GET route for getting all users
router.put('/UpdateUser/:id', updateUser); // Define a PUT route for updating a user
router.delete('/DeleteUser/:id', deleteUser); // Define a DELETE route for deleting a user
router.post('/AddUser', addUser); // Define a POST route for adding a user



module.exports = router;
