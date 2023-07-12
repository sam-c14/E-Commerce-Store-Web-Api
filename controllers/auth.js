// const Auth = require("../models/user.model");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

// const sendMail = require("../utilities/sendMail");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
  try {
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: Number(req.body.phoneNumber),
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    if (req.body.roles) {
      const roles = await Role.find({ name: { $in: req.body.roles } }).exec();
      user.roles = roles.map((role) => role._id);
      await user.save();
      // res.send({ message: "User was registered successfully!" });
    } else {
      const role = await Role.findOne({ name: "user" }).exec();
      if (role) {
        user.roles = [role._id];
        await user.save();
        // res.send({ message: "User was registered successfully!" });
      }
      console.log(user.email);
      res.redirect(`/api/v1/send-otp/${user.email}`); // Redirecting to send Otp to Users mail
      res.end();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const signIn = async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec();
  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }

  var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({ message: "Invalid Password!" });
  }

  const token = jwt.sign({ id: user.id }, config.secret, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: 86400, // 24 hours
  });

  var authorities = [];

  for (let i = 0; i < user.roles.length; i++) {
    authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
  }

  req.session.token = token;

  res.status(200).json({
    id: user._id,
    username: `${user.firstName} ${user.lastName}`,
    email: user.email,
    roles: authorities,
    session: {
      token: token,
    },
  });
};

const signOut = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};

// app.post("/verify",);
const verifyOtp = (req, res) => {
  const { OTP } = req.body; //Getting the user provided OTP
  const OTPSession = req.session.OTP; //Getting the stored OTP
  if (OTPSession) {
    //Checking if the OTP exist in the session
    if (OTP === OTPSession) {
      //Verifying the similarity of the OTP
      req.session.isAuth = true; //Setting auth to true
      return res.status(200).json({ message: "OTP is correct" });
    }
    return res.status(401).json({ message: "Incorrect OTP" });
  }
  return res.status(404).json({ message: "OTP not found" });
};

module.exports = {
  signIn,
  signOut,
  signUp,
  verifyOtp,
};
