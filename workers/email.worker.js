const nodemailer = require('nodemailer');
const Task = require('../models/task.model');
const User = require('../models/user.model');
const schedule = require('node-schedule');

const sendEmail = async (user, task) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'taskscheduler02@gmail.com', // Sender email address
                pass: 'password' // Sender email password
            }
        });

        const mailOptions = {
            from: 'taskscheduler02@gmail.com',
            to: user.email,
            subject: 'Task Reminder',
            html: `
            <div style="background-color: #228B22; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <h1 font-size: 1.8rem; style="color: white; margin-bottom: 15px;">Category: ${task.category}</h1>
    <div style="background-color: #98FB98; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
        <h3 style="margin: 0 0 10px; font-size: 1.5rem; color: black;">Task: ${task.task}</h3>
        <h4 style="margin-bottom: 5px; font-size: 1.2rem; color: black;">Description: ${task.description}</h4>
        <h4 style="margin-bottom: 5px; font-size: 1.2rem; color: black;">Scheduled on: ${task.scheduled_at}</h4>
    </div>
</div>           `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${user.email}`);
    } catch (error) {
        console.log(`Error sending email to user with ID ${user._id}:`, error);
    }
};

const scheduleEmailNotifications = async () => {
    try {
        const currentDate = new Date();

        // Find tasks scheduled for the current time or later
        const tasks = await Task.find({ remainder_at: { $gte: currentDate } });
        console.log(tasks)
        for (const task of tasks) {
            try {
                // Find the user associated with the task's user_id
                const user = await User.findById(task.user_id);

                if (!user) {
                    console.log(`User with ID ${task.user_id} not found.`);
                    continue; // Skip this task and proceed to the next one
                }

                // Schedule sending email notification for the task
                schedule.scheduleJob(task.remainder_at, async () => {
                    await sendEmail(user, task);
                });
            } catch (error) {
                console.log(`Error finding user for task with ID ${task._id}:`, error);
                continue; // Skip this task and proceed to the next one
            }
        }

        console.log("Email notifications scheduled successfully.");
    } catch (error) {
        console.log("Error scheduling email notifications:", error);
    }
};


module.exports = scheduleEmailNotifications;
