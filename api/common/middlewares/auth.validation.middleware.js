const jwt = require("jsonwebtoken"),
  atSecret = require("../config/env.config.js").accessTokenSecret,
  rtSecret = require("../config/env.config.js").refreshTokenSecret,
  crypto = require("crypto"),
  UserModel = require("../../users/models/users.model");

exports.verifyRefreshBodyField = (req, res, next) => {
  if (req.body && req.body.refreshToken) {
    return next();
  } else {
    return res.status(400).send({ error: "No refresh token found" });
  }
};

/*Check if the refresh token is valid. Also check if user access has been revoked. This way we can revoke user access while
issuing new tokens. This prevents the overhead of calling the db on every api call on restricted access routes, if user access has been revoked.*/

exports.validRefreshNeeded = (req, res, next) => {
  try {
    let { userId } = jwt.verify(req.body.refreshToken, rtSecret);
    UserModel.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(400).send({ errors: "User not found" });
        } else if (user.revokeAccess) {
          return res
            .status(403)
            .send({ errors: "Your access has been revoked. Contact admin." });
        } else {
          req.body = {
            userId: user._id,
            email: user.email,
            permissionLevel: user.permissionLevel,
            provider: "email",
            name: user.firstName + " " + user.lastName,
            refreshed: true,
          };
          return next();
        }
      })
      .catch(() => res.status(400).send({ errors: "User not found" }));
  } catch (err) {
    return res.status(400).send({ error: "Invalid refresh token" });
  }
};

exports.validJWTNeeded = (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      let authorization = req.headers["authorization"].split(" ");
      if (authorization[0] !== "Bearer") {
        return res.status(401).send();
      } else {
        req.jwt = jwt.verify(authorization[1], atSecret);
        return next();
      }
    } catch (err) {
      return res.status(403).send();
    }
  } else {
    return res.status(401).send();
  }
};
