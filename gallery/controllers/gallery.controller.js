const fs = require("fs").promises;
const path = require("path");

const Image = (function () {
  return function (path, id) {
    this.id = id;
    this.path = `/static/gallery/images/${path}`;
  };
})();

exports.list = (req, res) => {
  let limit = 9;
  if (req.query) {
    if (req.query.limit) {
      req.query.limit = parseInt(req.query.limit);
      limit =
        Number.isInteger(req.query.limit) && req.query.limit <= 48
          ? req.query.limit
          : 9;
    }
  }
  let imageList = [];
  const dirPath = path.join(__dirname, "../../public/gallery/images");
  fs.readdir(dirPath)
    .then((files) =>
      files.forEach((file, id) => imageList.push(new Image(file, id)))
    )
    .then(() => imageList.slice(0, limit))
    .then((limitedList) => res.status(200).send({ images: limitedList }))
    .catch((err) => {
      res
        .status(500)
        .send({ error: "Error occurred while reading the images" });
      console.log("Error :", err);
    });
};
