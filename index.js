const express = require("express"); 
const dotenv = require("dotenv");
const connectDB = require("./config/connect");
const path = require("path");

const app = express();
dotenv.config();

// Connect to the database
connectDB();

// View Engine and Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

// Set the static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/routes"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}...`));

