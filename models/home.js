const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  src: String,
  title: String,
  price: Number,
  isSoldOut: Boolean,
  discount: Number,
});
module.exports = mongoose.model("Products", ProductSchema);
