require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// Middleware
app.use(cors());

// connect to the database
const DB_URL = process.env.DB_URL;
mongoose.connect(
    DB_URL,
    { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Connected to the database"));

app.use(express.json());

// Routes
const notesRouter = require("./routes/notes");
app.use("/notes", notesRouter);

// Send json respond to the client
app.get("/", (req, res) => {
    res.json({
        message: "Hello World"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
});