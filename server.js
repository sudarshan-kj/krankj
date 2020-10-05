const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 9000;
const rateLimit = require("express-rate-limit");

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

app.listen(port, () => console.log(`Listening on port ${port}`));
