const Joi = require("joi");

const letssee = Joi.string().min(10).required().validate("okaysdrtsadfklsajdf");
console.log(letssee);

try {
  const result = Joi.attempt("sdfsd", Joi.number());
} catch (err) {
  console.log("was not a number");
}
