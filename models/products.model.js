// const ISODate = require("isodate");
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  sku: String,
  title: String,
  description: String,

  manufacture_details: {
    model_number: String,
    release_date: String,
    brand: String,
    phone_number: String,
  },

  shipping_details: {
    weight: Number,
    width: Number,
    height: Number,
    depth: Number,
  },

  product_details: {
    overview: Array,
    description: Object,
    shipping: String,
    warranty: {
      term: String,
      details: String,
    },
    product_img: String,
    return_policy: String,
  },

  quantity: Number,
  categories: Array,
  pricing: {
    price: Number,
    discount: Number,
  },
  product_tag: String,
  in_carts: Array,
});
module.exports = mongoose.model("Products", ProductSchema);
