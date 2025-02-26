const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validateRequest");
const { registerSchema, loginSchema } = require("../validators/auth.validator");
const { isAuthenticated, loadUser } = require("../middlewares/auth");
const userController = require("../controllers/user.controller");

// Auth
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

// Users
router.get(
  "/me",
  asyncHandler(isAuthenticated),
  asyncHandler(userController.getMe)
);

router.get(
  "/:id",
  asyncHandler(loadUser),
  asyncHandler(userController.findById)
);

router.put(
  "/",
  asyncHandler(isAuthenticated),
  asyncHandler(userController.update)
);

router.get("/", asyncHandler(userController.getAll));

module.exports = router;
