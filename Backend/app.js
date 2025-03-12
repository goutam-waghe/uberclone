const express = require("express");
const dotenv = require("dotenv");
const dbconnection = require("./src/config/dbconnect");
const cors = require("cors");
const userRoute = require("./src/routes/user.routes");
const cookieParser = require("cookie-parser");
const captainRoute = require("./src/routes/captain.routes");
const app = express();
//dotenv config
dotenv.config();
//db connection
dbconnection();
//cors
app.use(cors());
//body parser
app.use(express.json());
//url encoded
app.use(express.urlencoded({ extended: true }));
//cookie parser
app.use(cookieParser());
//routes
app.use("/user", userRoute);
app.use("/captain", captainRoute);

app.get("/", function (req, res) {
  res.json({
    Message: "working fine",
  });
});
module.exports = app;
