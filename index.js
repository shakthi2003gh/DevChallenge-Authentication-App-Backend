require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const signup = require("./routes/signup");
const login = require("./routes/login");
const update = require("./routes/update");

const app = express();

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.db)
  .then(() => {
    const port = process.env.PORT || 3001;

    app.listen(port);
    console.log(`Listening on port ${port}...`);
  })
  .catch(() => console.log("Could not connrct to MongoDB..."));

app.use(express.json());
app.use("/signup", signup);
app.use("/login", login);
app.use("/update", update);
