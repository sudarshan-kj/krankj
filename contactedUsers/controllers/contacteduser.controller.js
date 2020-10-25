const Filter = require("bad-words");
const filter = new Filter();
const email = require("../../utils/email");
const ContactedUserModel = require("../model/contacteduser.model");
const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";

exports.saveUser = (req, res) => {
  let sanitizedFields = {
    email: filter.clean(req.body.email),
    name: filter.clean(req.body.name),
    message: filter.clean(req.body.message),
  };
  let isProfane = filter.isProfane(req.body.message);

  ContactedUserModel.saveContactedUser(sanitizedFields)
    .then(() => {
      res.send({ msg: "Message submitted" });
      email.send(sanitizedFields, isProfane);
    })
    .catch((err) => {
      res.status(400).send({ error: "Message not submitted" });
      logger.error("Error occurred while saving user data", err);
    });
};
