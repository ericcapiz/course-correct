const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth/auth");
const tutorRoutes = require("./routes/tutor/tutor");
const bookingRoutes = require("./routes/tutorBooking/tutorBooking");
const studyGroupRoutes = require("./routes/studyGroup/studyGroup");
require("dotenv").config();

const app = express();

app.use((req, res, next) => {
  next();
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Course Correct API is up and running!" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tutors", tutorRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/studyGroups", studyGroupRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
