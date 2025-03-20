const { EVENTS } = require("..");
const { publishMessage } = require("../config/rabbitmq");

async function createOrder(order) {
  await publishMessage(EVENTS.ORDER_CREATED, order);
}
async function cancelOrder(order) {
  await publishMessage(EVENTS.ORDER_CANCELED, order);
}

module.exports = { createOrder, cancelOrder };
