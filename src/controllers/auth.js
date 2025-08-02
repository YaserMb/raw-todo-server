const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateToken,verifyToken } = require('../services/token.service');
const ApiError = require('../utils/ApiError');

const register = async (req, res, next) => {
  try {
    const { fullName,email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists, please try again with a different email.',
      });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const user = await User.create({
      fullName: fullName,
      email: email.toLowerCase(),
      password: hashedPassword
    });
    
    const token = generateToken(user);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {email: user.email},
        token
      }
    });
  } catch (error) {
    next(error);
  }
};


const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials, please try again.',
      });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials, please try again.',
      });
    }

    
    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {email: user.email},
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };