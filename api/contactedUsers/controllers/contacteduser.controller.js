const Filter = require("bad-words");
const filter = new Filter();
const email = require("../../utils/email");
const ContactedUserModel = require("../model/contacteduser.model");
const Joi = require("joi");
const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";

const schema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  name: Joi.string().min(2).max(30).required(),
  message: Joi.string().min(1).max(300).required(),
});

exports.saveUser = (req, res) => {
  let sanitizedFields = {
    email: filter.clean(req.body.email),
    name: filter.clean(req.body.name),
    message: filter.clean(req.body.message),
  };
  let isProfane = filter.isProfane(req.body.message);
  const { error } = schema.validate(sanitizedFields);
  if (error) {
    return res.status(400).send({ error: error.details });
  }
  email
    .send(sanitizedFields, isProfane)
    .then(() => {
      res.send({ msg: "Message submitted" });
    })
    .then(() => {
      return ContactedUserModel.saveContactedUser(sanitizedFields);
    })
    .catch((err) => {
      res.status(400).send({ error: "Message not submitted", msg: err });
      logger.error("Error occurred while saving user data", err);
    });
};
