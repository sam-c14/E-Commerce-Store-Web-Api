const { products } = require("../models/index");
const Product = products;

const addProduct = async (req, res) => {
  try {
    await Product.create(req.body);
    res.status(201).send({ message: "Product added successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const removeProduct = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};

module.exports = {
  addProduct,
  removeProduct,
  updateProduct,
};
