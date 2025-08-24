const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB, sequelize } = require("./src/config/db");
const { User, Note } = require("./src/models/associations"); // <-- Impor di sini

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Hubungkan ke database dan sinkronkan model
connectDB();
sequelize
  .sync({ force: true }) // <-- Pastikan flag ini ada
  .then(() => {
    console.log("Model berhasil disinkronkan dengan database.");
  })
  .catch((err) => {
    console.error("Gagal menyinkronkan model:", err);
  });

// Import Routes
// Import Routes
const authRoutes = require("./src/routes/auth_routes");
const noteRoutes = require("./src/routes/notes_routes");
const exportRoutes = require("./src/routes/export_routes");

// Gunakan Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/export", exportRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
