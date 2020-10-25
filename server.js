const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 9000;
const path = require("path");
const rateLimit = require("express-rate-limit");
const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";

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
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));
app.get("/api/*", getApiLimiter);
app.post("/api/*", postApiLimiter);
logger.debug("Setting up routes");
const apiRouter = express.Router();
app.use("/api", apiRouter);
apiRouter.use("/auth", AuthorizationRoutes);
apiRouter.use("/users", UsersRoutes);
apiRouter.use("/images", GalleryRoutes);
apiRouter.use("/contact", ContactRoutes);

app.listen(port, () => logger.debug(`Listening on port ${port}`));
