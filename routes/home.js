const express = require("express");
const router = express.Router();
const {
  getProducts,
  setProducts,
  getSponsoredProducts,
  getTodaysDeals,
  getRecommendedProducts,
} = require("../controllers/home");

router.route("/").get(getProducts).post(setProducts);

module.exports = router;
