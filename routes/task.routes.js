const express = require('express');
const router = express.Router();
const {getTasks, addTask, updateTask, deleteTask} = require('../controllers/task.controller');

// Get Tasks
router.get('/GetTasks/:user_id', getTasks);

// Add Task
router.post('/AddTask/:user_id', addTask);

// Update Task
router.put('/UpdateTask/:id/:user_id', updateTask);

// Delete Task
router.delete('/DeleteTask/:id/:user_id', deleteTask);

module.exports = router;
