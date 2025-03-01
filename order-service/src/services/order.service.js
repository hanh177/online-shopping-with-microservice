const orderModel = require("../models/order.model");

class OrderService {
  static async createOrder(order) {
    return await orderModel.create(order);
  }
  static async getOrders(query) {
    return await orderModel.find(query);
  }
  static async getOrderById(id) {
    return await orderModel.findById(id);
  }
  static async updateOrder(id, order) {
    return await orderModel.findByIdAndUpdate(id, order, { new: true });
  }
  static async deleteOrder(id) {
    return await orderModel.findByIdAndDelete(id);
  }
  static async cancelOrder(id) {
    return await orderModel.findByIdAndUpdate(
      id,
      { status: "CANCELLED" },
      { new: true }
    );
  }
  static async getOrdersByUser(userId) {
    return await orderModel.find({ userId });
  }
}

module.exports = OrderService;
