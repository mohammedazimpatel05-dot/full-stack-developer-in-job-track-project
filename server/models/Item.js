import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    itemImage: {
      type: String, // we'll store image filename or path
      //required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export { Item };