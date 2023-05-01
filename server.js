const express = require("express");
const app = express();
const homeRoutes = require("./routes/home");

app.use(express.json());
app.use("/api/v1", homeRoutes);
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
const port = 5000;
app.listen(port, () => {
  console.log("Server is listening at port 5000...");
});
