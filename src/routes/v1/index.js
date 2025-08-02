const express = require("express")
const router = express.Router()
const authRoutes = require('./auth.router');
const taskRoutes = require('./task.router');

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;