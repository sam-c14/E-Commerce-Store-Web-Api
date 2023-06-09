// User.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const passportLocalMongoose = require("passport-local-mongoose");
var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  phoneNumber: Number,
  email: String,
  password: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  otp: String,
});

// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
