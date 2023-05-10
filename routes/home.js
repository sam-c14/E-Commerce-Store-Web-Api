const express = require("express");
const router = express.Router();
const {
  setProducts,
  getSponsoredProducts,
  getTodaysDeals,
  getRecommendedProducts,
} = require("../controllers/home");

router.route("/").get(getTodaysDeals).post(setProducts);

module.exports = router;
