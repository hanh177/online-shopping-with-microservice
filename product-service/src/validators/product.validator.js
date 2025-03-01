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

const productQuerySchema = Joi.object({
  name: Joi.string().optional(),
  price: Joi.number().min(1).optional(),
  category: Joi.string().optional(),
  brand: Joi.string().optional(),
  priceFrom: Joi.number().min(1).optional(),
  priceTo: Joi.number().min(1).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  page: Joi.number().min(0).optional().default(0),
  take: Joi.number().min(1).optional().default(10),
  sort: Joi.string().optional().default("updatedAt"),
  sortType: Joi.string().optional().default("desc"),
});

module.exports = {
  productSchema,
  productQuerySchema,
};
