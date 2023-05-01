const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(() => {
  console.log("Server is listening at port 5000");
});
