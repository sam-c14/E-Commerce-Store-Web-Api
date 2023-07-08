const Auth = require("../models/auth");

const loginUser = async (req, res) => {
  const user = await Auth.findOne(req.body).exec();
  try {
    if (user === null) {
      res.statusMessage =
        "The user could not be found, Please Register to be able to login";
      return res.status(404).json({ user });
    }
  } catch (error) {
    res.statusMessage =
      "There was an error processing the request from the server, Please Try Again";
    return res.status(500).json({ user });
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
