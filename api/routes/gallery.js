const GalleryController = require("../gallery/controllers/gallery.controller");
const express = require("express");

const galleryRouter = express.Router();
galleryRouter.get("", GalleryController.list);

module.exports = galleryRouter;
