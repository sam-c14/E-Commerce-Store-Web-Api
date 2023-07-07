const Auth = require("../models/auth");

const loginUser = async (req, res) => {
  const user = await Auth.findOne(req.body).exec();
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
