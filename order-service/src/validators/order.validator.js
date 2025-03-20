const Joi = require("joi");
const { ORDER_STATUS } = require("../constants");

const orderSchema = Joi.object({
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
      })
    )
    .min(1)
    .required(),
});

const orderQuerySchema = Joi.object({
  status: Joi.string().valid(...Object.values(ORDER_STATUS)),
});

module.exports = {
  orderSchema,
  orderQuerySchema,
};
