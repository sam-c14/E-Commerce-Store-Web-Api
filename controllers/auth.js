const Auth = require("../models/auth");

const loginUser = async (req, res) => {
  const user = await Auth.findOne(req.body).exec();
  try {
    if (user === null) {
      return res
        .status(404)
        .statusText("The user is has not been registered")
        .json({ user });
    }
  } catch (error) {
    return res
      .status(500)
      .statusText(
        "There was an error processing the request from the server, Try Again"
      )
      .json({ user });
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
