const { authJwt } = require("../middlewares/auth");
const {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
  getUser,
  updateUserDetails,
} = require("../controllers/user");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/test/all", allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    moderatorBoard
  );

  app.get(
    "/api/v1/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    adminBoard
  );

  app.get("/api/v1/user/", getUser);
  app.put("/api/v1/update-user", updateUserDetails);
};
