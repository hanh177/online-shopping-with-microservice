const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(1).required(),
  description: Joi.string().optional(),
  category: Joi.string().optional(),
  brand: Joi.string().optional(),
  image: Joi.string().optional(),
  stock: Joi.number().min(0).required(),
  tags: Joi.array().items(Joi.string()).optional(),
});

module.exports = {
  productSchema,
};
