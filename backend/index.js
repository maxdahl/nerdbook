require("dotenv").config();

// Setup
const mongoose = require("mongoose");
mongoose
  .connect(
    process.env.mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const passport = require("passport");
app.use(passport.initialize());

require("./config/passport")(passport);

// Routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
