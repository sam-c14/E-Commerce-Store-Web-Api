// const ISODate = require("isodate");
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  sku: String,
  title: String,
  description: String,

  manufacture_details: {
    model_number: String,
    release_date: String,
  },

  shipping_details: {
    weight: Number,
    width: Number,
    height: Number,
    depth: Number,
  },

  quantity: Number,
  categories: Array,
  pricing: {
    price: Number,
  },
  in_carts: Array,
});
module.exports = mongoose.model("Products", ProductSchema);
