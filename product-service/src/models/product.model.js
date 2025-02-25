const { Schema, model } = require("mongoose"); // Erase if already required

const COLLECTION_NAME = "Products";
const DOCUMENT_NAME = "Product";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, productSchema);
