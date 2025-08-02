const express = require('express');
const router = express.Router();
const taskController = require('../../controllers/task');
const { authenticate } = require('../../middlewares/auth');
const  {createTaskValidation,updateTaskValidation,taskIdValidation}  = require('../../validations/task.validation');
const validate = require('../../middlewares/validation');

router.get('/', authenticate, taskController.getTasks);
router.post('/', authenticate, validate(createTaskValidation), taskController.createTask);
router.put('/:id', authenticate, validate(updateTaskValidation), taskController.updateTask);
router.delete('/:id', authenticate, validate(taskIdValidation), taskController.deleteTask);

module.exports = router;