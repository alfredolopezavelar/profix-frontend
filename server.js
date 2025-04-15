const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dataHandler = require('./controllers/data-handler');  // Import the data handler

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());  // For parsing application/json

// MongoDB Connection
const dbUri = "mongodb+srv://alfredo:alfredo@sistemasescalables.s5sqk.mongodb.net/?retryWrites=true&w=majority&appName=SistemasEscalables";
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("connecting", () => {
    console.log("Connecting...");
});
db.on("connected", () => {
    console.log("Successfully connected to MongoDB!");
});

// Mount routes
app.use('/api', dataHandler);  // All routes from data_handler.js will be prefixed with /api

// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
