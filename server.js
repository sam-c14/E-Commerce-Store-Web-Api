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
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger"); // Path to your Swagger configuration

// ... Your middleware and routes ...

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "E-Mart:",
});

// Serve Swagger UI at /api-docs
app.use("/api/e-mart/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

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

require("./routes/auth")(app);
require("./routes/user")(app);
require("./routes/cart")(app);
require("./routes/products")(app);

app.use(
  session({
    secret: process.env.REDIS_STORE_SECRET_KEY, //session secret key
    resave: false,
    saveUninitialized: false,
    store: redisStore, //Setting the store
  })
);

const PORT = process.env.PORT || 5000;
main(process.env.MONGO_URI)
  .then(async () => {
    // await redisConnect();
    app.listen(PORT, () => {
      console.log(`Server is listening at port ${process.env.PORT}...`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });
