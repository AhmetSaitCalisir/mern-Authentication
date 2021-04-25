require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

// Connect DB
connectDB();

const auth = require("./routes/auth");

const app = express();

app.use(express.json());

app.use("/api/auth", auth);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 4545;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}/`);
});
