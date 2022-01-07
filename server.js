const config = require('./config');
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json()); //

// DB Config
const DB_URL = config.dbUrl;

// Connect to MongoDB
mongoose
  .connect(DB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
const notesRouter = require("./routes/notes");
app.use("/notes", notesRouter);

// Home Route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the Note App"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
});