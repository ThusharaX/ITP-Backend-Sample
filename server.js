const config = require('./config');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); //

// DB Config
const DB_URL = config.db_url;

// Connect to MongoDB
mongoose
  .connect(DB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
const notesRouter = require("./routes/notes");
app.use("/notes", notesRouter);

// Root API Call
app.get("/", (req, res) => {
    res.send("<h2>Welcome to the Note App</h2>");
});

// Start Server
const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
});