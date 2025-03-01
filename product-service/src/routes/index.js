const express = require("express");
const asyncHandler = require("express-async-handler");
const { isAuthenticated, loadUser } = require("../middlewares/auth");
const { isProductOwner } = require("../middlewares/product");
const productController = require("../controllers/product.controller");
const validateRequest = require("../middlewares/validateRequest");
const {
  productSchema,
  productQuerySchema,
} = require("../validators/product.validator");
const router = express.Router();

router.get(
  "/",
  validateRequest(productQuerySchema),
  asyncHandler(productController.findAll)
);

router.get(
  "/me",
  asyncHandler(isAuthenticated),
  validateRequest(productQuerySchema),
  asyncHandler(productController.findByUserId)
);

router.get("/:id", asyncHandler(productController.findOneProduct));
router.get(
  "/user/:userId",
  asyncHandler(loadUser),
  validateRequest(productQuerySchema),
  asyncHandler(productController.findByUserId)
);

/// authentication required routes
router.use(asyncHandler(isAuthenticated));

router.post(
  "/",
  validateRequest(productSchema),
  asyncHandler(productController.createProduct)
);

router.put(
  "/:id",
  asyncHandler(isProductOwner),
  validateRequest(productSchema),
  asyncHandler(productController.updateProduct)
);

router.delete(
  "/:id",
  asyncHandler(isProductOwner),
  asyncHandler(productController.deleteProduct)
);

module.exports = router;
