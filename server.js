const main = require("./db/connect");
const express = require("express");
const app = express();
const homeRoutes = require("./routes/home");
const cors = require("cors");
const db = require("./models/index");
const { redisConnect, redisClient } = require("./db/redisConnect.");
const ISODate = require("isodate");
require("dotenv").config();
const cookieSession = require("cookie-session");
const session = require("express-session"); //Importing express session
const RedisStore = require("connect-redis").default; //Importing connect-redis and passing the session

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "E-Mart:",
});

app.use(cors());
app.use(express.json());
app.use("/api/v1", homeRoutes);
app.use(express.urlencoded({ extended: true }));
const Role = db.role;

app.use(
  cookieSession({
    name: "e-mart-session",
    keys: [process.env.COOKIE_SECRET], // should use as secret environment variable
    httpOnly: true,
  })
);

app.use(
  session({
    secret: process.env.REDIS_STORE_SECRET_KEY, //session secret key
    resave: false,
    saveUninitialized: false,
    store: redisStore, //Setting the store
  })
);

require("./routes/auth")(app);
require("./routes/user")(app);
require("./routes/cart")(app);

const PORT = process.env.PORT || 5000;
main(process.env.MONGO_URI)
  .then(async () => {
    await initial();
    // await redisConnect();
    app.listen(PORT, () => {
      console.log(`Server is listening at port ${process.env.PORT}...`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

const initial = async () => {
  try {
    const roleCount = await Role.estimatedDocumentCount();
    if (roleCount === 0) {
      const user = await Role.create({
        name: "user",
      });
      if (user) console.log("user role successfully created");

      const mod = await Role.create({
        name: "moderator",
      });
      if (mod) console.log("mod role successfully created");

      const admin = await Role.create({
        name: "admin",
      });
      if (admin) console.log("admin role successfully created");
    }
    const productCount = await db.products.estimatedDocumentCount();
    if (productCount === 0) {
      const Product = db.products;
      await Product.create({
        sku: "111445GB3",
        title: "Simsong One mobile phone",
        description: "The greatest Onedroid phone on the market .....",

        manufacture_details: {
          model_number: "A123X",
          release_date: new ISODate("2012-05-17T08:14:15.656Z"),
        },

        shipping_details: {
          weight: 350,
          width: 10,
          height: 10,
          depth: 1,
        },

        quantity: 99,

        pricing: {
          price: 1000,
        },
      });
      const query = { sku: "111445GB3" };
      const updatedPro = await Product.findOne(query);
      // console.log(updatedPro);
      updatedPro.categories = ["mobile/15G", "mobile/fm"];
      await updatedPro.save();
    }
  } catch (error) {
    console.log(error);
  }
  return;
};
