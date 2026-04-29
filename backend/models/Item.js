import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
     discountPercentage: {
      type: Number,
      default: 0,
      required: [true, "Discount percentage is required"],
    },
    imageUrl: {
      type: String,
      default: "",
      trim: true,
    },
  },
 
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);