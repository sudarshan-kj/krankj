const UsersController = require("../users/controllers/users.controller");
const PermissionMiddleware = require("../common/middlewares/auth.permission.middleware");
const ValidationMiddleware = require("../common/middlewares/auth.validation.middleware");
const config = require("../common/config/env.config");
const express = require("express");

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

const usersRouter = express.Router();

usersRouter.post("", [UsersController.insert]);
usersRouter.get("", [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(PAID),
  UsersController.list,
]);
usersRouter.get("/:userId", [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(FREE),
  PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
  UsersController.getById,
]);
usersRouter.patch("/:userId", [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(FREE),
  PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
  UsersController.patchById,
]);
usersRouter.delete("/:userId", [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
  UsersController.removeById,
]);

module.exports = usersRouter;
