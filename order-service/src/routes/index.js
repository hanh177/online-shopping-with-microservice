const express = require("express");
const asyncHandler = require("express-async-handler");
const { isAuthenticated } = require("../middlewares/auth");
const validate = require("../middlewares/validateRequest");
const { orderSchema } = require("../validators/order.validator");
const OrderController = require("../controllers/order.controller");
const { validateProducts } = require("../middlewares/order");
const router = express.Router();

router.use(asyncHandler(isAuthenticated));
router.post(
  "/",
  validate(orderSchema),
  asyncHandler(validateProducts),
  asyncHandler(OrderController.createOrder)
);

module.exports = router;
