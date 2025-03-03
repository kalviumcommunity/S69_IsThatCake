require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());

const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Fix: Move CORS Middleware Before Routes
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// ✅ Fix: Connect to MongoDB Before Setting Up Routes
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to database."))
  .catch((err) => console.log('Failed to connect:', err));

// ✅ Ensure /api Routes Exist
const routes = require('./routes');
app.use('/api', routes);  // ✅ Corrected placement

// ✅ Root Route
app.get('/', (req, res) => {
  const status = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
  res.status(200).json({ message: "Welcome to IsThatCake", database: status });
});

// ✅ Start Server After Setting Up Everything
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
