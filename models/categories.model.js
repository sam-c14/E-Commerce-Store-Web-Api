const mongoose = require("mongoose");

const Categories = new mongoose.Schema({
  title: String,
  parent: String,
  path: String,
});

module.exports = mongoose.model("Categories", Categories);
