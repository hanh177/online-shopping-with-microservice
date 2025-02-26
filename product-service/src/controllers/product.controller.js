const { OK } = require("../core/successResponse");
const ProductService = require("../services/product.service");

class ProductController {
  createProduct = async (req, res, next) => {
    return OK({
      res,
      message: "Create product success",
      metadata: await ProductService.create({
        ...req.body,
        owner: req.user._id,
      }),
    });
  };

  updateProduct = async (req, res, next) => {
    return OK({
      res,
      message: "Update product success",
      metadata: await ProductService.update(req.params.id, req.body),
    });
  };

  deleteProduct = async (req, res, next) => {
    return OK({
      res,
      message: "Delete product success",
      metadata: await ProductService.delete(req.params.id),
    });
  };

  findOneProduct = async (req, res, next) => {
    return OK({
      res,
      message: "Find one product success",
      metadata: await ProductService.findOne(req.params.id),
    });
  };

  findAll = async (req, res, next) => {
    return OK({
      res,
      message: "Find products success",
      metadata: await ProductService.find(req.query),
    });
  };
}

module.exports = new ProductController();
