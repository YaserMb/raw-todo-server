const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth');
const validate = require('../../middlewares/validation');;
const { registerValidation,loginValidation } = require('../../validations/auth.validation');

router.post('/register', validate(registerValidation), authController.register);
router.post('/login', validate(loginValidation), authController.login);

module.exports = router;