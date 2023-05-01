const mongoose = require("mongoose");

async function main(url) {
  await mongoose.connect(url);
  return "Connection Successful";
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = main;
