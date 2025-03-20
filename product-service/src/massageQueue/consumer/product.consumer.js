const { QUEUES, EXCHANGES, EVENTS } = require("..");
const productRepository = require("../../repositories/product.repository");

async function handleOrderCreated({ products, userIds }) {
  try {
    for (const item of products) {
      await productRepository.update(item.productId, {
        $inc: {
          stock: -item.quantity,
          sold: item.quantity,
        },
      });
    }
    console.log("Update product stock done");
    return true;
  } catch (e) {
    console.log(`Update product stock error: ${e.message}`);
    return false;
  }
}

module.exports = [
  {
    queue: QUEUES.PRODUCT_ORDER_QUEUE,
    exchange: EXCHANGES.ORDER,
    routingKey: EVENTS.ORDER_CREATED,
    handler: handleOrderCreated,
  },
];
