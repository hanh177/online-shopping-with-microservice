const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/core/validateRequest");
const { registerSchema, loginSchema } = require("../validators/auth.validator");

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(authController.register)
);
router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(authController.login)
);

module.exports = router;
