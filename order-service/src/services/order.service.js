const { ORDER_STATUS } = require("../constants");
const OrderRepository = require("../repositories/order.repository");
const producer = require("../massageQueue/producer/order.producer");
class OrderService {
  static async createOrder(order) {
    await producer.createOrder(order);
    const data = await OrderRepository.create(order);

    return data;
  }
  static async getOrders({ page = 0, take = 10, ...query }) {
    const _page = Math.max(0, page - 1);
    const _take = parseInt(take, 10);

    const matchQuery = populateDbQuery(query, {
      array: ["status"],
    });

    const sort = populateDBSort(query);
    return await OrderRepository.findAll({
      query: matchQuery,
      limit: _take,
      skip: _page * _take,
      sort,
    });
  }
  static async getOrderById(id) {
    return await OrderRepository.findById(id);
  }
  static async updateOrder(id, order) {
    return await OrderRepository.update(id, order);
  }
  static async deleteOrder(id) {
    return await OrderRepository.delete(id);
  }
  static async cancelOrder(id) {
    return await OrderRepository.update(id, { status: ORDER_STATUS.CANCELLED });
  }
  static async getOrdersByUser(userId) {
    const _page = Math.max(0, page - 1);
    const _take = parseInt(take, 10);

    const matchQuery = populateDbQuery(query, {
      array: ["status"],
    });
    matchQuery.userId = userId;

    const sort = populateDBSort(query);
    return await OrderRepository.findAll({
      query: matchQuery,
      limit: _take,
      skip: _page * _take,
      sort,
    });
  }
}

module.exports = OrderService;
