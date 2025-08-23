// Import bcrypt for password hashing and the User and Task models for database interactions.
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const Task = require('../models/task.model.js')

// Hashes the password
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
};

// Function to authenticate a user by comparing the hashed passwords.
const loginUser = async (request, response) => {
    const { email, password } = request.body;

    try {
        // Query the database to find the user by email
        const user = await User.findOne({ email: email });

        // If no user found with the provided email
        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }

        // Compare hashed password with the provided password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).json({ error: 'Incorrect password' });
        }

        // If password matches, user is authenticated
        response.json(user);
    } catch (error) {
        console.log("Error logging in user:", error);
        response.status(500).json({ error: 'Internal server error' });
    }
};

// Function to register a new user.
const registerUser = async (request, response) => {
    const { email, password, firstName, lastName, dob, gender } = request.body;

    try {
        // Prevent duplicate registrations by checking if email already exists.
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return response.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password and store the new user with hashed password.
        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            email: email,
            password: hashedPassword, // Store the hashed password
            firstName: firstName,
            lastName: lastName,
            dob: dob,
            gender: gender,
        });

        await newUser.save();

        response.status(201).json({ message: 'User registered successfully', userId: newUser._id });
    } catch (error) {
        console.log("Error registering user:", error);
        response.status(500).json({ error: 'Internal server error' });
    }
};

// Function to update user details.
const updateUser = async (request, response) => {
    const userId = request.params.id;
    const { email, firstName, lastName, dob, gender, isAdmin } = request.body;

    try {
        const updatedUser = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            dob: dob,
            gender: gender,
            isAdmin: isAdmin,
        };

        // Update user information in the database
        await User.findByIdAndUpdate(userId, updatedUser);
        response.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.log("Error updating user:", error);
        response.status(500).json({ error: 'Internal server error' });
    }
};

// Function to delete a user and their associated tasks
const deleteUser = async (request, response) => {
    const userId = request.params.id;
    try {
        // Delete tasks associated with the user
        await Task.deleteMany({ user_id: userId });

        // Then delete the user
        await User.findByIdAndDelete(userId);
        
        response.status(200).json({ message: 'User and associated tasks deleted successfully' });
    } catch (error) {
        console.log("Error deleting user:", error);
        response.status(500).json({ error: 'Internal server error' });
    }
};

// Function to add a new user. Similar to registration but can be used for different contexts.
const addUser = async (request, response) => {
    const { email, password, firstName, lastName, dob, gender } = request.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return response.status(400).json({ error: 'Email already exists' });
        }

        // Hash password and create a new user record.
        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            email: email,
            password: hashedPassword, // Store the hashed password
            firstName: firstName,
            lastName: lastName,
            dob: dob,
            gender: gender,
        });

        await newUser.save();

        response.status(201).json({ message: 'User added successfully', userId: newUser._id });
    } catch (error) {
        console.log("Error adding user:", error);
        response.status(500).json({ error: 'Internal server error' });
    }
};

// Function to fetch all users from the database.
const getUsers = async (request, response) => {
    try {
        const users = await User.find();
        response.status(200).json(users);
    } catch (error) {
        console.log("Error fetching users:", error);
        response.status(500).json({ error: 'Internal server error' });
    }
};

// Exporting all functions for use in other files.
module.exports = { loginUser, registerUser, updateUser, deleteUser, addUser, getUsers };


