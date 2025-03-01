require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler");
const { NotFound } = require("./core/errorResponse");

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
app.use("/", require("./routes"));

// handle errors
app.use((req, res, next) => {
  return next(NotFound());
});

// error handler middlewares
app.use(errorHandler);

module.exports = app;
