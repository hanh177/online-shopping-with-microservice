const { OK } = require("../core/successResponse");
const OrderService = require("../services/order.service");

class OrderController {
  createOrder = async (req, res, next) => {
    return OK({
      res,
      message: "Create Order success",
      metadata: await OrderService.createOrder({
        ...req.body,
        userId: req.user._id,
      }),
    });
  };

  updateOrder = async (req, res, next) => {
    return OK({
      res,
      message: "Update Order success",
      metadata: await OrderService.updateOrder(req.params.id, req.body),
    });
  };

  deleteOrder = async (req, res, next) => {
    return OK({
      res,
      message: "Delete Order success",
      metadata: await OrderService.deleteOrder(req.params.id),
    });
  };

  findOne = async (req, res, next) => {
    return OK({
      res,
      message: "Find one Order success",
      metadata: await OrderService.getOrderById(req.params.id),
    });
  };

  find = async (req, res, next) => {
    return OK({
      res,
      message: "Find Orders success",
      metadata: await OrderService.getOrders(req.query),
    });
  };

  cancelOrder = async (req, res, next) => {
    return OK({
      res,
      message: "Cancel Order success",
      metadata: await OrderService.cancelOrder(req.params.id),
    });
  };

  getOrdersForUser = async (req, res, next) => {
    return OK({
      res,
      message: "Find Orders by user success",
      metadata: await OrderService.getOrdersByUser(req.user._id),
    });
  };
}

module.exports = new OrderController();
