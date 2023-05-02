const getTodaysDeals = (req, res) => {
  res.send("Todays Deals");
};
const getSponsoredProducts = (req, res) => {
  res.send(" Sponsored Products");
};
const getRecommendedProducts = (req, res) => {
  res.send("Hello World");
};
// const getTodaysDeals = (req, res) => {
//   res.send("Hello World");
// };
const setProducts = (req, res) => {
  res.send("Products Set");
};

module.exports = {
  getTodaysDeals,
  getSponsoredProducts,
  getRecommendedProducts,
  setProducts,
};
