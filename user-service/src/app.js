require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const cors = require("cors");
const { errorHandler } = require("./middlewares/core/errorHandler");
const { NotFound } = require("./core/errorResponse");
const { OK } = require("./core/successResponse");

// middlewares
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// init mongodb
require("./dbs/init.mongodb");

// init routes
app.use("/v1", require("./routes"));

app.use("/", (req, res, next) => {
  return OK({ res, message: "This is user service ..." });
});

// handle errors
app.use((req, res, next) => {
  return next(NotFound());
});

// error handler middlewares
app.use(errorHandler);

module.exports = app;
