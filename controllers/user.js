const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
exports.getUser = async (req, res) => {
  // console.log(req.query.email_address);
  try {
    const user = await User.findOne({ email: req.query.email_address });
    res.status(200).json({
      user,
    });
  } catch (error) {
    if (error.status === 500) {
      res.status(500).json({
        error:
          "There was an internal server error, Kindly wait and try again after a few minutes",
      });
    } else {
      res.status(401).json({
        error:
          "The user could not be found, Check the email address and try again",
      });
    }
  }
};
exports.updateUserDetails = async (req, res) => {
  const id = req.body._id;
  try {
    // const userss = await User.findOne({ email: req.body.email });
    // console.log(userss);
    const user = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    // console.log(user);
    if (user) {
      res.status(201).json({
        user,
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // console.log(error);
    if (error.status === 500) {
      res.status(500).json({
        error:
          "There was an internal server error, Kindly wait and try again after a few minutes",
      });
    } else {
      res.status(401).json({
        error: "The user could not be found, Check the id and try again",
      });
    }
  }
};
