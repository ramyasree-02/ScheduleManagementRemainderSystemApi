// Importing Mongoose library to work with MongoDB.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defining the schema for tasks within our application.
const taskSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', strictPopulate: false }, // References User model, not strictly populated
    description: String, // Description of the task
    category: String, // Category to which the task belongs
    task: String, // The task itself
    scheduled_at: Date, // Date and time the task is scheduled for
    remainder_at: Date, // Date and time for sending a reminder about the task
    created_at: { type: Date, default: Date.now }, // Auto-sets the creation date of the task
    updated_at: { type: Date, default: Date.now } // Auto-sets the last update date of the task
});

// Compiling our schema into a Model.
module.exports = mongoose.model('Task', taskSchema);