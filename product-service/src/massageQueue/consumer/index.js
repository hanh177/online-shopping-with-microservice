const { consumeMessage } = require("../config/rabbitmq");
const consumers = require("./product.consumer");

function startEventListeners() {
  consumers.forEach(({ queue, exchange, routingKey, handler }) => {
    consumeMessage(queue, exchange, routingKey, handler);
  });
  console.log("✅ Event Listeners Started");
}

module.exports = {
  startEventListeners,
};
