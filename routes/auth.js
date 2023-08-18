const { verifySignUp, authJwt } = require("../middlewares/auth");
const {
  signIn,
  signUp,
  signOut,
  verifyEmail,
  adminSignUp,
} = require("../controllers/auth");
const { products } = require("../models/index");
const sendMailOtp = require("../utilities/sendMail");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  /**
   * @swagger
   * /api/v1/signup:
   *   post:
   *     summary: Sign Up as a user
   *     parameters:
   *       - in: path
   *         name: firstName
   *         required : true
   *       - in: path
   *         name: lastName
   *         required : true
   *       - in: path
   *         name: phoneNumber
   *         required : true
   *       - in: path
   *         name: email
   *         required : true
   *       - in: path
   *         name: password
   *         required : true
   *       - in: path
   *         name: role
   *         required : true
   *     responses:
   *       200:
   *         description: SignUp Successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 email:
   *                   type: string
   *                   description: Email of the user
   *             example:
   *               email: johndoe@example.com
   *       302:
   *          description : Redirect to otp route
   *       500:
   *         description: Internal Server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 errorMsg:
   *                   type: string
   *                   description: response message
   *             example:
   *               errorMsg: An error occurred while processing your request
   */

  app.post(
    "/api/v1/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    signUp
  );

  /**
   * @swagger
   * /api/v1/login:
   *   post:
   *     summary: Login as a user
   *     parameters :
   *       - in: path
   *         name: email
   *         required : true
   *       - in: path
   *         name: password
   *         required : true
   *     responses:
   *       201:
   *         description: Login successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   description: ID of the user
   *                 username:
   *                   type: string
   *                   description: Name of the user
   *                 email:
   *                   type: string
   *                   description: Email of the user
   *                 roles :
   *                    type : array
   *                    description : Array of the user's roles
   *                 session :
   *                    type : object
   *                    description : Contains jwt token
   *             example:
   *               id: 64cd12bd00b2dc759fc33972
   *               username: John Doe
   *               email: johndoe@example.com
   *               roles : ['USER']
   *               session :
   *                  token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
   *       500:
   *         description: Internal Server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 errorMsg:
   *                   type: string
   *                   description: response message
   *             example:
   *               errorMsg: An error occurred while processing your request
   */

  app.post("/api/v1/login", signIn);

  /**
   * @swagger
   * /api/v1/logout:
   *   post:
   *     summary: User Log out
   *     responses:
   *      200:
   *         description: Log Out Successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 response:
   *                   type: string
   *                   description: Log out response
   *             example:
   *               response: User successfully logged out
   *
   */

  app.post("/api/v1/logout", [authJwt.verifyToken], signOut);

  /**
  app.post(
    "/admin/v1/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    adminSignUp
  );

  /**
   * @swagger
   * /api/v1/login:
   *   post:
   *     summary: Login as a user
   *     parameters :
   *       - in: path
   *         name: email
   *         required : true
   *       - in: path
   *         name: password
   *         required : true
   *     responses:
   *       201:
   *         description: Login successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   description: ID of the user
   *                 username:
   *                   type: string
   *                   description: Name of the user
   *                 email:
   *                   type: string
   *                   description: Email of the user
   *                 roles :
   *                    type : array
   *                    description : Array of the user's roles
   *                 session :
   *                    type : object
   *                    description : Contains jwt token
   *             example:
   *               id: 64cd12bd00b2dc759fc33972
   *               username: John Doe
   *               email: johndoe@example.com
   *               roles : ['USER']
   *               session :
   *                  token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
   *       500:
   *         description: Internal Server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 errorMsg:
   *                   type: string
   *                   description: response message
   *             example:
   *               errorMsg: An error occurred while processing your request
   */

  app.post("/admin/v1/login", signIn);

  app.get("/api/v1/send-otp/:userEmail", sendMailOtp);
  app.post("/api/v1/send-otp", verifyEmail);
};
