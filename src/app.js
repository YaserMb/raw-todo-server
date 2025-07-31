const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const { errorHandler } = require("./middlewares/error");
const authRoutes = require('./routes/v1/auth');
const taskRoutes = require('./routes/v1/task');

const app = express()
app.use(cors())


// Parse JSON bodies
app.use(express.json());

// Mount routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

// Error handling middleware
app.use(errorHandler);
module.exports = app

