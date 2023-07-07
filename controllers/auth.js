const Auth = require("../models/auth");

const loginUser = async (req, res) => {
  try {
    const user = await Auth.findOne(req.body).exec();
    if (user === null) {
      res.status(404).json({
        errorMsg: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      errMsg: "There was an error processing the request.",
    });
  }
  res.status(200).json({ user });
};
const registerUser = async (req, res) => {
  const user = await Auth.create(req.body);
  res.status(201).json({ user });
};

module.exports = {
  loginUser,
  registerUser,
};
