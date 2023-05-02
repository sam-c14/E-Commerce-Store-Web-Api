const getProducts = (req, res) => {
  res.send("Hello World");
};
const setProducts = (req, res) => {
  res.send("Products Set");
};

module.exports = {
  getProducts,
  setProducts,
};
