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

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.status(200).json({ product: allProducts });
  } catch (error) {
    res.status(500).json({
      msg: "An error occurred while getting the products, Please refresh te browser and try again",
    });
  }
};

const getProductsByPage = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    const page = Number(req.params.page);
    const limit = page * 7;
    let start = limit - 7;
    let pageProducts = [];
    for (start; start < limit; start++) {
      const currentProduct = allProducts[start];
      if (!currentProduct) break;
      pageProducts.push(currentProduct);
    }

    res.status(200).json({
      product: pageProducts,
      max_pages: Math.ceil(allProducts.length / 7),
      current_page: page,
    });
  } catch (error) {
    res.status(500).json({
      msg: `An error occurred while getting the products, Please check params being passed check ${error}`,
    });
  }
};

const getReservedProducts = async (req, res) => {
  try {
    const tag = capitalize(req.params.tag);
    const sponsoredProducts = await products.find({
      product_tag: tag,
    });
    res.status(200).json({ sponsoredProducts });
  } catch (error) {
    res.status(200).json({ error });
  }
};

const getSingleProduct = async (req, res) => {
  const sku = req.params.sku;
  try {
    const product = await products.findOne({ sku });
    return product
      ? res.status(200).json({ product })
      : res.status(404).json({ msg: "The product does not exist" });
  } catch (error) {
    res.status(500).json({ msg: "There was an error with the server" });
  }
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
  addProduct,
  removeProduct,
  updateProduct,
  getAllProducts,
  getProductsByPage,
  getReservedProducts,
  getSingleProduct,
  capitalize,
};
