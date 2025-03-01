const orderModel = require("../models/order.model");

class OrderRepository {
  async findAll({ query, limit, skip, sort }) {
    return {
      total: await orderModel.countDocuments(query),
      items: await orderModel.find(query).sort(sort).skip(skip).limit(limit),
    };
  }
  async findById(id) {
    return orderModel.findById(id);
  }
  async findOne(query) {
    return orderModel.findOne(query);
  }
  async delete(id) {
    return orderModel.findByIdAndDelete(id);
  }
  async create(data) {
    return orderModel.create(data);
  }
  async update(id, data) {
    return orderModel.findByIdAndUpdate(id, data, { new: true });
  }
}

module.exports = new OrderRepository();
