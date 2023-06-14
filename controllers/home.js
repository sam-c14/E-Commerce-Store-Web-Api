const getTodaysDeals = (req, res) => {
  res.json("Todays Deals");
};
const getSponsoredProducts = (req, res) => {
  res.json(" Sponsored Products");
};
const getRecommendedProducts = (req, res) => {
  res.json("Hello World");
};
// const getTodaysDeals = (req, res) => {
//   res.json("Hello World");
// };
const setProducts = (req, res) => {
  res.json("Products Set");
};

module.exports = {
  getTodaysDeals,
  getSponsoredProducts,
  getRecommendedProducts,
  setProducts,
};
