const { validationResult } = require("express-validator");
const captainModel = require("../models/captain.model");
const createCaption = require("../services/captain.service");
const blacklistModel = require("../models/blacklisttoken.model");

module.exports.registerCaptain = async function (req, res) {
  console.log("step1 ");
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("step2");
  const { fullname, email, password, vehicle } = req.body;
  let user = await captainModel.findOne({ email });
  console.log("step3");
  if (user) {
    return res.status(400).json({
      Message: "user Already exits",
    });
  }
  console.log("step4");

  const hashedPassword = await captainModel.hashPassword(password);

  user = await createCaption({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });
  const token = await user.generateToken();
  res.cookie("token", token);
  res.json({
    token,
    user,
    Message: "captian Rehgisterd Successfully",
  });
};

//login
module.exports.loginCaptain = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  let user = await captainModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).json({
      Message: "invalid email or password",
    });
  }
  const isMatched = await user.camparePassword(password);

  if (!isMatched) {
    return res.status(400).json({
      Message: "invaild password or email",
    });
  }
  const token = await user.generateToken();
  res.cookie("token", token);

  res.status(200).json({
    Message: "login successful",
    token,
    user,
  });
};
module.exports.captainProfile = async function (req, res) {
  return res.status(200).json(req.user);
};
module.exports.logoutCaptain = async function (req, res) {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blacklistModel.create({
    token,
  });
  return res.status(200).json({
    Messge: "user logout",
  });
};
