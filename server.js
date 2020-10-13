const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 9000;
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const email = require("./email");
const Filter = require("bad-words");
const filter = new Filter();

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
    error: "Too many submissions recorded. Please submit again after an hour.",
  },
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/api/*", getApiLimiter);
app.post("/api/*", postApiLimiter);
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

app.post("/api/contact/submit", function (request, response) {
  let sanitizedFields = {
    email: filter.clean(request.body.email),
    name: filter.clean(request.body.name),
    message: filter.clean(request.body.message),
  };
  let isProfane = filter.clean(request.body.message);
  let u = new User({
    ...sanitizedFields,
  });

  u.save(function (err) {
    if (err) throw err;
    else console.log("Successfully saved user");
  });
  response.send({ msg: "Request submitted successfully" });
  email.send(sanitizedFields, isProfane);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
