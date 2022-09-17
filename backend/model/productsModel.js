import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  nameProduct: {
    type: String,
    required: [true, "please enter the name"],
  },
  photo: {
    type: [String],
    required: [true, "please enter the photo"],
  },
  description: {
    type: String,
    default: "show the details",
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 1,
  },
  phoneNum: {
    type: Number,
  },
  recipe: {
    type: String,
  },
});

const Products = mongoose.model("products", productSchema);

export default Products;
