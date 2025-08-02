const jwt = require("jsonwebtoken")
const moment = require("moment")
const ApiError = require("../utils/ApiError")


const generateToken = (user) => { 
  const payload = {
        sub: user.id,
        id: user.id,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(1, "d").unix(),
    }
    return jwt.sign(payload, process.env.JWT_SECRET)
}


const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    throw new ApiError("Invalid or expired token", 401)
  }
}

module.exports = {
  generateToken,
  verifyToken,
}