const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const uploadRoutes = require("./routes/fileUploadRoute.js");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DATABSE_URL = process.env.MONGO_URL;

// MongoDB connection
mongoose.connect(DATABSE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", uploadRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
