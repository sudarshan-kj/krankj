const express = require("express");
const VerifyUserMiddleware = require("../authorization/middlewares/verify.user.middleware");
const AuthorizationController = require("../authorization/controllers/authorization.controller");
const AuthValidationMiddleware = require("../common/middlewares/auth.validation.middleware");

const authRouter = express.Router();
authRouter.post("", [
  VerifyUserMiddleware.hasAuthValidFields,
  VerifyUserMiddleware.isPasswordAndUserMatch,
  AuthorizationController.login,
]);

authRouter.post("/refresh", [
  AuthValidationMiddleware.verifyRefreshBodyField,
  AuthValidationMiddleware.validRefreshNeeded,
  AuthorizationController.refresh,
]);

module.exports = authRouter;
