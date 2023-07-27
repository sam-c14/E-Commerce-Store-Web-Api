// const { verifySignUp } = require("../middlewares/auth");
const {
  addProduct,
  removeProduct,
  updateProduct,
} = require("../controllers/products");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/admin/v1/add-product", addProduct);

  app.post("/admin/v1/remove-product/:productId", removeProduct);

  app.put("/admin/v1/update-product/:productId", updateProduct);

  //   app.get("/admin/v1/send-otp/:userEmail", sendMailOtp);
  //   app.post("/admin/v1/send-otp", verifyEmail);
};
