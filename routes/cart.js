const { checkProductInventory } = require("../middlewares/cart/checkInventory");
const {
  createCart,
  addToCart,
  changeProductQuantity,
  removeFromCart,
  checkCartStatus,
  getCartData,
} = require("../controllers/cart");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/v1/create-cart", createCart);

  app.post("/api/v1/change-prod-quantity", changeProductQuantity);

  app.post("/api/v1/remove-from-cart", removeFromCart);
  app.post("/api/v1/check-status", checkCartStatus);
  app.post("/api/v1/add-to-cart", addToCart);
  app.get("/api/v1/user-cart/", getCartData);
};
