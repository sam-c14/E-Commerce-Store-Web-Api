const { products } = require("../../models/index");

checkProductExisted = async (req, res, next) => {
  const { sku } = req.body;
  if (!sku) return res.status(400).json({ msg: "Sku Not Present" });
  const hasProduct = await products.findOne({
    sku,
  });
  if (hasProduct) {
    res.status(403).json({ msg: "The product already exists" });
    return;
  }

  next();
};

module.exports = { checkProductExisted };
