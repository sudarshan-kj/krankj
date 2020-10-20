const GalleryController = require("./controllers/gallery.controller");

exports.routesConfig = function (app) {
  app.get("/images", [GalleryController.list]);
};
