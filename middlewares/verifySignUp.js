const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Usernames
  try {
    const userName = await User.findOne({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }).exec();

    if (userName) {
      res
        .status(400)
        .send({ message: "Failed! You've been registered before!" });
      return;
    } else {
      // Email
      const userEmail = await User.findOne({
        email: req.body.email,
      }).exec();
      // console.log(req.body.email, "here");
      // console.log(userEmail);
      if (userEmail) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    }
  } catch (error) {}
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
