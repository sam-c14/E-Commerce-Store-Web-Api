const db = require("../../models/index");
const ISODate = require("isodate");

checkProductInventory = async (req, res, next) => {
  // Carts
  const { products, _id } = req.body;
  const newQuantity = 1;
  try {
    const updateInv = await db.products.updateOne(
      {
        sku: products.sku,
        quantity: { $gte: newQuantity },
      },
      {
        $inc: { quantity: -newQuantity },
        $push: {
          in_carts: {
            quantity: newQuantity,
            id: _id,
            timestamp: new ISODate(),
          },
        },
      }
    );
    console.log(updateInv);
    if (!updateInv.acknowledged) {
      db.carts.updateOne(
        {
          _id,
        },
        {
          $pull: { products: { sku } },
        }
      );
      res
        .status(400)
        .json({ msg: "You requested for more items than we have" });
      return;
    }
    next();
  } catch (error) {}
};

const checkProducts = {
  checkProductInventory,
};

module.exports = checkProducts;
