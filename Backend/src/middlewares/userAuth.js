const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklisttoken.model");

async function userAuth(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  const blacklisted = await blacklistModel.findOne({ token });
  console.log(blacklisted);
  if (blacklisted) {
    return res.status(401).json({
      Message: "unAuthrize user from backlisted",
    });
  }
  if (!token) {
    return res.status(401).json({
      Message: "unAuthrize user from token not found",
    });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    let user = await userModel.findById(decode._id);
    console.log(user);
    req.user = user;
    return next();
  } catch (error) {
    res.status(401).json({
      Message: "unAuthrize user",
    });
  }
}

module.exports = userAuth;
