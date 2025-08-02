const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const { errorHandler } = require("./middlewares/error");
const v1Routes = require("./routes/v1");

const app = express()
app.use(cors())


// Parse JSON bodies
app.use(express.json());

// Mount routes
app.use("/api/v1", v1Routes);  

// Error handling middleware
app.use(errorHandler);
module.exports = app

