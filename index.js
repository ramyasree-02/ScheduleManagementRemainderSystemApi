const express = require('express');
const connectDB = require('./config/database.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');
const scheduleEmailNotifications = require('./workers/email.worker');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connectDB();
scheduleEmailNotifications()

// Routes
app.use('/api/taskmanagementapp/user', userRoutes);
app.use('/api/taskmanagementapp/task', taskRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
