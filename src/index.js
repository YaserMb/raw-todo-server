const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');


dotenv.config();

const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });

})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
