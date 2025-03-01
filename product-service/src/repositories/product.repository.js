const productModel = require("../models/product.model");

class ProductRepository {
  async findAll({ query, limit, skip, sort }) {
    return {
      total: await productModel.countDocuments(query),
      items: await productModel.find(query).sort(sort).skip(skip).limit(limit),
    };
  }
  async findById(id) {
    return productModel.findById(id);
  }
  async findOne(query) {
    return productModel.findOne(query);
  }
  async delete(id) {
    return productModel.findByIdAndDelete(id);
  }
  async create(data) {
    return productModel.create(data);
  }
  async update(id, data) {
    return productModel.findByIdAndUpdate(id, data, { new: true });
  }
}

module.exports = new ProductRepository();
