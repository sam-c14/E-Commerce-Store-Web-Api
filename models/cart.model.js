const mongoose = require("mongoose");
const ISODate = require("isodate");

const Cart = mongoose.Schema({
  _id: String,
  status: String,
  quantity: Number,
  total_price: Number,
  modified_on: String,
  products: Array,
});

module.exports = mongoose.model("Cart", Cart);
