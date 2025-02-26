const express = require("express");
const asyncHandler = require("express-async-handler");
const { isAuthenticated } = require("../middlewares/auth");
const { isProductOwner } = require("../middlewares/product");
const productController = require("../controllers/product.controller");
const validateRequest = require("../middlewares/validateRequest");
const { productSchema } = require("../validators/product.validator");
const router = express.Router();

router.get("/", asyncHandler(productController.findAll));
router.get("/:id", asyncHandler(productController.findOneProduct));

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
