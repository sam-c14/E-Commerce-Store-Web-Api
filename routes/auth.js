const { verifySignUp } = require("../middlewares");
const { signIn, signUp, signOut } = require("../controllers/auth");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    signUp
  );

  app.post("/login", signIn);

  app.post("/logout", signOut);
};
