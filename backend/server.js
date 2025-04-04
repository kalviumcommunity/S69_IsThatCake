require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/routes"); // Ensure this is the correct path
const authRoutes=require("./routes/authRoutes");
const app = express();
app.use(express.json());

const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Set up CORS before defining routes
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

// ✅ Use routes with "/api" prefix (REMOVE app.use(routes))
app.use("/api", routes);
app.use("/api/auth",authRoutes);

// ✅ Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to database."))
  .catch((err) => console.log("Failed: ", err));

// ✅ Basic test route
app.get("/", (req, res) => {
  const status = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
  res.status(200).json({ message: "Welcome to IsThatCake", database: status });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
