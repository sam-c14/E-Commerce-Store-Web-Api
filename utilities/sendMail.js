const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const MailGen = require("mailgen");
const otpGenerator = require("./otpGenerator");
const findUserByEmail = require("../utilities/findUser");
const db = require("../models/index");
const User = db.user;

const mailGen = new MailGen({
  theme: "default",
  product: {
    name: "E-Mart",
    link: "https://e-commerce-store-rose.vercel.app/",
  },
});

const otp = otpGenerator();

const response = {
  body: {
    name: "Confirm The Email You Registered with us",
    intro:
      "Welcome to Mailgen! Verify it's you by entering the otp in the input.",
    text: "We at E-Mart want to be sure it's you so please enter the Otp below in the field provided on the site",
    outro: otp,
  },
};
// console.log(typeof process.env.REFRESH_TOKEN);
const mail = mailGen.generate(response);
// console.log(mail);

const message = {
  from: process.env.EMAIL,
  to: "",
  subject: "USER SIGNUP VERIFICATION",
  html: mail,
};

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

let config = {
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const sendOtpMail = async (req, res) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    // console.log(accessToken, "access");
    config.auth.accessToken = accessToken;
    const transporter = nodemailer.createTransport(config);
    message.to = req.params.userEmail;
    const user = await findUserByEmail(req.params.userEmail, User);
    // save the otp in the users document
    user.otp = otp;
    await user.save();
    await transporter.sendMail(message);
    res.status(200).json({
      msg: "You should receive an email",
      userEmail: req.params.userEmail,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Something went wrong with the process from sendMail" });
  }
};

module.exports = sendOtpMail;
