const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 9000;
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");

let mongoDB = "mongodb://127.0.0.1/test";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
let Schema = mongoose.Schema;

let userSchema = new Schema({
  email: String,
  name: String,
  message: String,
});

let User = mongoose.model("User", userSchema);

//Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const getApiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 500,
  message: {
    error: "Too many requests. Please try again later",
  },
});

const postApiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 3,
  message: {
    error: "Too many submissions. Please submit again after an hour.",
  },
});

app.get("/api/*", getApiLimiter);
app.post("/api/*", postApiLimiter);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.get("/api/gallery", (req, res) => {
  res.send({ key: "Srinivas and Sudarshan" });
});

let msg = {
  key: "value",
};

app.post("/api/world", (req, res) => {
  res.send(msg);
});

app.post("/api/contact", function (request, response) {
  let u = new User({
    email: request.body.email,
    name: request.body.name,
    message: request.body.message,
  });

  u.save(function (err) {
    if (err) throw err;
    else console.log("Successfully saved user");
  });
  response.send({ msg: " ok" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
