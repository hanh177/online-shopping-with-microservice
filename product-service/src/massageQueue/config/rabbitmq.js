const amqp = require("amqplib");

const RABBITMQ_URL = "amqp://guest:guest@localhost:5672";
const EXCHANGE_NAME = "product_exchange";
let channel = null; // Lưu channel để sử dụng sau

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });

    console.log("✅ Connected to RabbitMQ");
  } catch (error) {
    console.error("❌ RabbitMQ Connection Failed:", error);
    process.exit(1); // Dừng ứng dụng nếu không kết nối được
  }
}

// Hàm publish message
async function publishMessage(routingKey, message) {
  if (!channel) throw new Error("RabbitMQ channel not initialized");
  channel.publish(
    EXCHANGE_NAME,
    routingKey,
    Buffer.from(JSON.stringify(message))
  );
  console.log(`📩 Sent to ${routingKey}:`, message);
}

// Hàm consume message
async function consumeMessage(queue, exchange, routingKey, handler) {
  if (!channel) throw new Error("RabbitMQ channel not initialized");

  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange, routingKey);

  channel.consume(queue, async (msg) => {
    if (msg) {
      const content = JSON.parse(msg.content.toString());
      console.log(`📥 Received from ${routingKey}:`, content);
      const handled = await handler(content);
      if (handled) channel.ack(msg);
    }
  });

  console.log(`✅ Listening on queue: ${queue} with routingKey: ${routingKey}`);
}

module.exports = { connectRabbitMQ, publishMessage, consumeMessage };
