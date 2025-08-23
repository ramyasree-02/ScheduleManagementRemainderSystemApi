// config/database.js

// Importing the mongoose module to interact with MongoDB
const mongoose = require('mongoose');

// Define the MongoDB connection string, which includes the username, password, and database name
const CONNECTION_STRING = "mongodb+srv://<<username>>:<<password>>@cluster0.e44op9f.mongodb.net/taskmanagementdb?retryWrites=true&w=majority";

// Asynchronous function to connect to MongoDB using mongoose
const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB database using the connection_string
        await mongoose.connect(CONNECTION_STRING,);
        // If the connection is successful, this will log the message
        console.log('Connected to MongoDB');
    } catch (error) {
        //if there is any error during the connection process, it logs this error message
        console.error('Error connecting to MongoDB:', error);
    }
};

//It exports the connectDB function to be used in other parts of the application
module.exports = connectDB;
