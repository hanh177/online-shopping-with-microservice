const { Schema, model } = require("mongoose"); // Erase if already required
const { ORDER_STATUS } = require("../constants");

const COLLECTION_NAME = "Orders";
const DOCUMENT_NAME = "Order";

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, orderSchema);
