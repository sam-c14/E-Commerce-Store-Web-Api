// const { verifySignUp } = require("../middlewares/auth");
const {
  addProduct,
  removeProduct,
  updateProduct,
  getAllProducts,
  getProductsByPage,
} = require("../controllers/products");
const {
  checkProductExisted,
} = require("../middlewares/products/checkProductCat");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/admin/v1/add-product", [checkProductExisted], addProduct);

  app.post("/admin/v1/remove-product/:productId", removeProduct);

  app.put("/admin/v1/update-product/:productId", updateProduct);

  app.get("/admin/v1/get-products", getAllProducts);
  app.get("/api/v1/get-products", getAllProducts);
  app.get("/api/v1/get-products/:page", getProductsByPage);

  //   app.get("/admin/v1/send-otp/:userEmail", sendMailOtp);
  //   app.post("/admin/v1/send-otp", verifyEmail);
};
