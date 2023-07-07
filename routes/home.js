const express = require("express");
const router = express.Router();
const {
  setProducts,
  getSponsoredProducts,
  getTodaysDeals,
  getRecommendedProducts,
} = require("../controllers/home");
const { loginUser, registerUser } = require("../controllers/auth");

router.route("/").get(getTodaysDeals).post(setProducts);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;
