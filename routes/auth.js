const { verifySignUp } = require("../middlewares");
const { signIn, signUp, signOut, verifyOtp } = require("../controllers/auth");
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
  app.get("/api/v1/verify-otp", (req, res) => {
    // console.log(res);
    // res.send("Welcome to the verify route"); //Welcome Message
    console.log(req.session.OTP); //Logging out the OTP stored in the session.
  });
  app.post("/api/v1/verify-otp", verifyOtp);
};
