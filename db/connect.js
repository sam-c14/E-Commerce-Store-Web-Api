const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://SamC14:Mrgrandta14@e-commerce-project.h5xe1ai.mongodb.net/ECommerceStore?retryWrites=true&w=majority";

async function main() {
  await mongoose.connect(connectionString);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = main;
