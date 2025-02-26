const productModel = require("../models/product.model");

class ProductService {
  static async find(query) {
    return productModel.find(query);
  }
  static async findOne(id) {
    return productModel.findById(id);
  }
  static async delete(id) {
    return productModel.findByIdAndDelete(id);
  }
  static async create(data) {
    return productModel.create(data);
  }
  static async update(id, data) {
    return productModel.findByIdAndUpdate(id, data, { new: true });
  }
}

module.exports = ProductService;
