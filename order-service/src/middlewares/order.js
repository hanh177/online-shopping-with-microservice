const { BadRequest } = require("../core/errorResponse");
const productClientService = require("../services/productClient.service");

const validateProducts = async (req, res, next) => {
  const { products } = req.body;

  Promise.all(
    products.map(async ({ productId, quantity }) => {
      const product = await productClientService.getProduct(productId);
      return product;
    })
  )
    .then((res) => {
      res.map((item) => {
        if (item.stock < quantity) return next(BadRequest);
      });
    })
    .catch((e) => {
      return next(BadRequest);
    });

  next();
};

module.exports = {
  validateProducts,
};
