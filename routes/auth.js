const { verifySignUp } = require("../middlewares/auth");
const { signIn, signUp, signOut, verifyEmail } = require("../controllers/auth");
const { products } = require("../models/index");
const sendMailOtp = require("../utilities/sendMail");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/api/v1/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    signUp
  );

  app.post("/api/v1/login", signIn);

  app.post("/api/v1/logout", signOut);

  app.get("/api/v1/send-otp/:userEmail", sendMailOtp);
  app.post("/api/v1/send-otp", verifyEmail);
};
