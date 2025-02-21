require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const cors = require("cors");

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
app.use((req, res) => {
  return res.status(404).json({
    status: "error",
    code: 404,
    message: `Route ${req.originalUrl} not found`,
  });
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal server error",
    stack: process.env.NODE_ENV === "dev" ? error.stack : undefined,
  });
});

module.exports = app;
