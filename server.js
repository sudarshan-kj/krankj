const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 9000;
const path = require("path");
const rateLimit = require("express-rate-limit");
const {
  AuthorizationRoutes,
  UsersRoutes,
  GalleryRoutes,
  ContactRoutes,
} = require("./routes");

let sessionOptions = { secret: "keyboard cat", cookie: {} };

const getApiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 500,
  message: {
    error: "Too many requests. Please try again later",
  },
});

const postApiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 3,
  message: {
    error: "Too many submissions recorded. Please submit again after an hour.",
  },
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public")));
app.get("/api/*", getApiLimiter);
app.post("/api/*", postApiLimiter);

const apiRouter = express.Router();
app.use("/api", apiRouter);
apiRouter.use("/auth", AuthorizationRoutes);
apiRouter.use("/users", UsersRoutes);
apiRouter.use("/images", GalleryRoutes);
apiRouter.use("/contact", ContactRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));
