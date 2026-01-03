const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' })); // Allows parsing JSON, increased limit for base64 images

// --- Database Connection ---
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
  .then(() => console.log("MongoDB database connection established successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// --- API Routes ---
const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});