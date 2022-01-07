require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

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


// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


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