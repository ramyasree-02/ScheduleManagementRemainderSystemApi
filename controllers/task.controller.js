//Importing the Task model so I can work with tasks in the database
const Task = require('../models/task.model');

// importing the email scheduler to send the notifications related to tasks
const scheduleEmailNotifications = require('../workers/email.worker.js'); 

// Function to fetch all tasks associated with a user.
const getTasks = async (request, response) => {
    try {
        // I'm pulling the user's ID from the request parameters to find their tasks.
        const userId = request.params.user_id;
        // Fetching tasks by user ID and sorting them by their scheduled times.
        const tasks = await Task.find({ user_id: userId }).sort({ scheduled_at: 1 });
        // Sending the tasks back to the client as a JSON response.
        response.json(tasks);
    } catch (error) {
        // Logging the error to the console if there's a problem fetching tasks.
        console.error("Error retrieving tasks:", error);
        // Responding with a 500 status code if an error occurs.
        response.status(500).json({ error: 'Internal server error' });
    }
};

// Function to add a new task to the database.
const addTask = async (request, response) => {
    try {
        // Extracting the user ID from the request parameters.
        const user_id = request.params.user_id;
        // Extracting task details directly from the request body.
        const { description, category, task, scheduled_at, remainder_at } = request.body;
        // Storing the current time as the task's created and updated timestamp.
        const currentTime = new Date().toISOString().slice(0, -5);
        // Creating a new task instance.
        const newTask = new Task({
            user_id,
            description,
            category,
            task,
            scheduled_at,
            remainder_at, // Include remainder_at field
            created_at: currentTime,
            updated_at: currentTime
        });
        // Saving the new task to the database.
        await newTask.save();
        // Triggering an email notification about the new task.
        await scheduleEmailNotifications();
        // If everything goes well, sending a success response with the new task's ID.
        response.status(201).json({ message: 'Task added successfully', taskId: newTask._id });
    } catch (error) {
        // Logging any errors that occur and sending a 500 response.
        console.error("Error adding task:", error);
        response.status(500).json({ error: 'Internal server error' });
    }
};

// Function to update an existing task based on task ID.
const updateTask = async (request, response) => {
    try {
        // Extracting the task ID and user ID from the request parameters.
        const { id, user_id } = request.params;
        // Pulling the new task details from the request body.
        const { description, category, task, scheduled_at, remainder_at } = request.body;
        // Updating the task in the database.
        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, user_id },
            { $set: { description, category, task, scheduled_at, remainder_at, updated_at: new Date().toISOString().slice(0, -5) } },
            { new: true, upsert: false }
        );
        // If no task is found or updated, I send a 404 error response.
        if (!updatedTask) {
            return response.status(404).json({ error: 'Task not found or user not authorized' });
        }
        // Triggering an email notification for the updated task.
        await scheduleEmailNotifications();
        // Sending a success message if the update is successful.
        response.json({ message: 'Task updated successfully' });
    } catch (error) {
        // Logging the error and responding with a 500 if something goes wrong.
        console.error("Error updating task:", error);
        response.status(500).json({ error: 'Internal server error' });
    }
};


// Function to delete a task based on its ID.
const deleteTask = async (request, response) => {
    try {
        // Getting the task ID and user ID from the request parameters.
        const { id, user_id } = request.params;
        // Attempting to delete the task from the database.
        const deletedTask = await Task.findOneAndDelete({ _id: id, user_id });
        // If the task isn't found, an error with status 400 is sent.
        if (!deletedTask) {
            return response.status(404).json({ error: 'Task not found or user not authorized' });
        }
        // Sending a success message if the task is successfully deleted.
        response.json({ message: 'Task deleted successfully' });
    } catch (error) {
        // Logging any errors and sending a 500 error response if there's an issue.
        console.error("Error deleting task:", error);
        response.status(500).json({ error: 'Internal server error' });
    }
};

// Exporting all functions to be used elsewhere in the project.
module.exports = { getTasks, addTask, updateTask, deleteTask };