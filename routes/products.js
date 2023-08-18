const { authJwt } = require("../middlewares/auth");
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

  /**
   * @swagger
   * /admin/v1/add-product:
   *   post:
   *     summary: Add a product to the db as an admin
   *     responses:
   *       201:
   *         description: Product added successfully
   *       500:
   *          description : An error occurred while adding the product
   */

  app.post(
    "/admin/v1/add-product",
    [checkProductExisted, authJwt.verifyToken],
    addProduct
  );

  /**
   * @swagger
   * /admin/v1/remove-product/:productId:
   *   post:
   *     summary: Remove a product to the db as an admin
   *     responses:
   *       201:
   *         description: Product removed successfully
   *       500:
   *          description : An error occurred while adding the product
   */

  app.post(
    "/admin/v1/remove-product/:productId",
    [authJwt.verifyToken],
    removeProduct
  );

  /**
   * @swagger
   * /admin/v1/update-product/:productId:
   *   put:
   *     summary: Update a product to the db as an admin
   *     responses:
   *       201:
   *         description: Product updated successfully
   *       500:
   *          description : An error occurred while adding the product
   */
  app.put(
    "/admin/v1/update-product/:productId",
    [authJwt.verifyToken],
    updateProduct
  );

  /**
   * @swagger
   * /admin/v1/get-products:
   *   get:
   *     summary: Get products by pagination
   *     responses:
   *       200:
   *          description: Product gotten
   *          content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   items: ID of the user
   *                 name:
   *                   type: string
   *                   items: Name of the user
   *                 email:
   *                   type: string
   *                   items: Email of the user
   *             example:
   *               sku: 111445GB3
   *               title: Simsong One mobile phone
   *               description: The greatest Onedroid phone in the market...
   *               manufacture_details :
   *                  model_number: A123X
   *                  release_date: new ISODate("2012-05-17T08:14:15.656Z")
   *                  brand : Simsong
   *                  phoneNumber: 07041604936
   *               shipping_details:
   *                  weight : 350
   *                  width : 1
   *                  height : 2
   *                  depth : 3
   *               product_details:
   *                  overview: ["Light-weight", "Good Battery Life", "Nice Shape"]
   *                  description:
   *                      color: Black
   *                      brand : Simsong
   *                      screen_size : Others
   *                      connectivity : Wifi + 4G
   *                      sim_type : Nano Sim
   *                  shipping : 1- 7 days
   *                  warranty:
   *                      term : 1 Year
   *                      details : AUTHORIZED SIMSONG PHONES
   *                  product_img: https://res.cloudinary.com/
   *                  return_policy : No return policy
   *               quantity : 99
   *               categories: ["mobile/15G", "mobile/fm"]
   *               pricing:
   *                  price : 1000
   *       500:
   *          description : An error occurred while getting the products, Please refresh te browser and try again
   */

  app.get("/admin/v1/get-products", [authJwt.verifyToken], getAllProducts);

  /**
   * @swagger
   * /admin/v1/get-products/:page:
   *   get:
   *     summary: Get products by pagination
   *     responses:
   *       200:
   *          description: Product gotten
   *          content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   items: ID of the user
   *                 name:
   *                   type: string
   *                   items: Name of the user
   *                 email:
   *                   type: string
   *                   items: Email of the user
   *             example:
   *               sku: 111445GB3
   *               title: Simsong One mobile phone
   *               description: The greatest Onedroid phone in the market...
   *               manufacture_details :
   *                  model_number: A123X
   *                  release_date: new ISODate("2012-05-17T08:14:15.656Z")
   *                  brand : Simsong
   *                  phoneNumber: 07041604936
   *               shipping_details:
   *                  weight : 350
   *                  width : 1
   *                  height : 2
   *                  depth : 3
   *               product_details:
   *                  overview: ["Light-weight", "Good Battery Life", "Nice Shape"]
   *                  description:
   *                      color: Black
   *                      brand : Simsong
   *                      screen_size : Others
   *                      connectivity : Wifi + 4G
   *                      sim_type : Nano Sim
   *                  shipping : 1- 7 days
   *                  warranty:
   *                      term : 1 Year
   *                      details : AUTHORIZED SIMSONG PHONES
   *                  product_img: https://res.cloudinary.com/
   *                  return_policy : No return policy
   *               quantity : 99
   *               categories: ["mobile/15G", "mobile/fm"]
   *               pricing:
   *                  price : 1000
   *       500:
   *          description : An error occurred while getting the products, Please refresh te browser and try again
   */
  app.get(
    "/admin/v1/get-products/:page",
    [authJwt.verifyToken],
    getProductsByPage
  );
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
