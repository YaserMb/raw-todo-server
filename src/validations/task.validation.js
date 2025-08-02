const Joi = require("joi");

const createTaskValidation = Joi.object({
  name: Joi.string().min(3).required(),
}); 

const updateTaskValidation = Joi.object({
  name: Joi.string().min(3).optional(),
  completed: Joi.boolean().optional()
}); 

const taskIdValidation = Joi.object({
  id: Joi.string().required(),
}); 

module.exports = {
  createTaskValidation,
  updateTaskValidation,
  taskIdValidation,
};