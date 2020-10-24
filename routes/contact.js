const express = require("express");
const contactController = require("../contactedUsers/controllers/contacteduser.controller");

const contactRouter = express.Router();

contactRouter.post("/submit", contactController.saveUser);

module.exports = contactRouter;
