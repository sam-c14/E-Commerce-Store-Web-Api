const express = require("express");
const router = express.Router();
const { getProducts } = require("../controllers/home");

router.get("/", getProducts);

module.exports = router;
