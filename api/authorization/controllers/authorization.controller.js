const atSecret = require("../../common/config/env.config.js").accessTokenSecret;
const rtSecret = require("../../common/config/env.config.js")
  .refreshTokenSecret;
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  try {
    let accessToken = jwt.sign(req.body, atSecret, {
      expiresIn: "1h",
    });
    let refreshToken = jwt.sign({ userId: req.body.userId }, rtSecret, {
      expiresIn: "7d",
    });
    return res.status(201).send({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
};

exports.refresh = (req, res) => {
  try {
    let accessToken = jwt.sign(req.body, atSecret, {
      expiresIn: "5m",
    });
    res.status(201).send({ accessToken });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
};
