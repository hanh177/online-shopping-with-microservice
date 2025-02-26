const { Forbidden } = require("../core/errorResponse");
const ProductService = require("../services/product.service");

const isProductOwner = async (req, res, next) => {
  try {
    const id = req.params.id || req.body.id;
    const product = await ProductService.findOne({
      _id: id,
      owner: req.user._id,
    });
    if (!product) {
      return next(Forbidden("You are not allowed to access this product"));
    }
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  isProductOwner,
};
