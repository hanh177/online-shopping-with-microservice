const { Schema, model } = require("mongoose"); // Erase if already required
const slugify = require("slugify");

const COLLECTION_NAME = "Products";
const DOCUMENT_NAME = "Product";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    slug: {
      type: String,
      uique: true,
      lowerCase: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    category: {
      type: String,
      index: true,
      default: "Default",
    },
    brand: {
      type: String,
      default: "No Brand",
    },
    image: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    tags: [String], // keyword search
    rating: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//Export the model
module.exports = model(DOCUMENT_NAME, productSchema);
