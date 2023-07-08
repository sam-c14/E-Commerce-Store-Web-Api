const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

// (err, count) => {
//   if (!err && count === 0) {
//     new Role({
//       name: "user",
//     }).save((err) => {
//       if (err) {
//         console.log("error", err);
//       }

//       console.log("added 'user' to roles collection");
//     });

//     new Role({
//       name: "moderator",
//     }).save((err) => {
//       if (err) {
//         console.log("error", err);
//       }

//       console.log("added 'moderator' to roles collection");
//     });

//     new Role({
//       name: "admin",
//     }).save((err) => {
//       if (err) {
//         console.log("error", err);
//       }

//       console.log("added 'admin' to roles collection");
//     });
//   }
// };
