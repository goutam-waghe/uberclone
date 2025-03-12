const jwt = require("jsonwebtoken");

const blacklistModel = require("../models/blacklisttoken.model");
const captainModel = require("../models/captain.model");

async function captainAuth(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  const blacklisted = await blacklistModel.findOne({ token });

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

    let user = await captainModel.findById(decode._id);

    req.user = user;
    return next();
  } catch (error) {
    res.status(401).json({
      Message: "unAuthrize user",
    });
  }
}

module.exports = captainAuth;
