// Reusing Mongoose and Schema setup from above for consistency.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User schema to define the properties of a user in the system.
const userSchema = new Schema({
    email: String, // User's email address
    password: String, // Hashed password for security
    firstName: String, // User's first name
    lastName: String, // User's last name
    dob: Date, // User's date of birth
    gender: String, // User's gender
    isAdmin: { type: Boolean, default: false }, // Boolean to determine if the user has admin privileges
    created_at: { type: Date, default: Date.now }, // Automatically records when the user was created
    updated_at: { type: Date, default: Date.now } // Automatically records the last time the user's information was updated
});

// Compiling our schema into a Model.
module.exports = mongoose.model('User', userSchema);