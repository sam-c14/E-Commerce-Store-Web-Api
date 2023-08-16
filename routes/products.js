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

  app.get("/admin/v1/get-products/:page", getProductsByPage);
  app.get("/api/v1/get-products", getAllProducts);
  app.get("/api/v1/get-products/:page", getProductsByPage);

  //   app.get("/admin/v1/send-otp/:userEmail", sendMailOtp);
  //   app.post("/admin/v1/send-otp", verifyEmail);
};
/*
        sku: "111445GB3",
        title: "Simsong One mobile phone",
        description: "The greatest Onedroid phone on the market .....",

        manufacture_details: {
          model_number: "A123X",
          release_date: new ISODate("2012-05-17T08:14:15.656Z"),
          brand: "Simsong",
          phoneNumber: "07041604936",
        },

        shipping_details: {
          weight: 350,
          width: 10,
          height: 10,
          depth: 1,
        },

        product_details: {
          overview: ["Light-weight", "Good Battery Life", "Nice Shape"],
          description: {
            color: "Black",
            brand: "Simsong",
            screen_size: "Others",
            connectivity: "WiFi + 4G",
            sim_type: "Nano Sim",
          },
          shipping: "1-7 days",
          warranty: {
            term: "1 Year",
            details: "AUTHORIZED SIMSONG PHONES",
          },
          product_img: "https://res.cloudinary.com/",
          return_policy: "No return policy",
        },

        quantity: 99,
        categories: ["mobile/15G", "mobile/fm"],
        pricing: {
          price: 1000,
        },
      }
 */
