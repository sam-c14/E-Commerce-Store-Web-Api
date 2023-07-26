const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.products = require("./products.model");
db.categories = require("./categories.model");
db.cart = require("./cart.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
