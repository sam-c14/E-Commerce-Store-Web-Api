const main = require("./db/connect");
const express = require("express");
const app = express();
const homeRoutes = require("./routes/home");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/v1", homeRoutes);
app.use(express.urlencoded({ extended: true }));
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
const PORT = process.env.PORT || 5000;
main(process.env.MONGO_URI)
  .then((res) => {
    console.log(res);
    app.listen(PORT, () => {
      console.log("Server is listening at port 5000...");
    });
  })
  .catch((err) => console.log(err));
