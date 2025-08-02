const Task = require('../models/task.model');
const ApiError = require('../utils/ApiError');

const getTasks = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }
    const tasks = await Task.find({ userId: userId }).sort({ createdAt: -1 });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No tasks found for the user'
      });
    }
  
    res.json({
      success: true,
      message: 'Tasks retrieved successfully',
      data: tasks
    });
  } catch (error) {
    next(new ApiError(500, 'Failed to retrieve tasks'));
  }
};

const createTask = async (req, res, next) => {
  try {
    const userId = req.userId;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const { name } = req.body;

    const existingTask = await Task.findOne({
      name: name.trim(),
      userId: userId
    });
    
    if (existingTask) {
      return next(new ApiError(409, 'Task with this name already exists'));
    }

    const task = await Task.create({
      name: name.trim(),
      completed: false,
      userId: req.userId
    });
    
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    next(new ApiError(500, 'Failed to create task'));
  }
};



const updateTask = async (req, res, next) => {
  try {
    const userId = req.userId;  
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const { id } = req.params;
    const {  completed } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: id, userId: userId },
      { completed },
      { new: true, runValidators: true }
    );
    
    if (!task) {
      return next(new ApiError(404, 'Task not found or does not belong to the user'));
    }
    
    res.json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    next(new ApiError(500, 'Failed to update task'));
  }
};


const deleteTask = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }
    const { id } = req.params;
    
    const task = await Task.findOneAndDelete({
      _id: id,
      userId: req.userId
    });
    
    if (!task) {
      return next(new ApiError(404, 'Task not found or does not belong to the user'));
    }
    
    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    next(new ApiError(500, 'Failed to delete task'));
  }
};

module.exports = { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask 
};