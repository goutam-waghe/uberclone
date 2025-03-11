const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const createuser = require("../services/user.service");
const blacklistModel = require("../models/blacklisttoken.model");

//register user
module.exports.registerUser = async (req, res, next) => {
  //yha pr wo sare error aa jayege jo input validation ke time apn ne mention kiye hai
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (user) {
    return res.json({
      message: "user Already exits",
    });
  }
  const hashPassword = await userModel.hashPassword(password);
  user = await createuser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email: email,
    password: hashPassword,
  });

  const token = user.generateAuthToken();
  res.json({
    token,
    user,
  });
};

//login
module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  let user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({
      Message: "invalid email or password",
    });
  }
  const isMatched = await user.comparePassword(password);

  if (!isMatched) {
    return res.status(401).json({
      Message: "invaild password or email",
    });
  }
  const token = user.generateAuthToken();
  res.cookie("token", token);

  res.status(200).json({
    Message: "login successful",
    token,
    user,
  });
};

// get user profile
module.exports.userProfile = async function (req, res) {
  return res.status(200).json(req.user);
};

//logout user
module.exports.logoutUser = async function (req, res) {
  res.clearCookie("token");

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blacklistModel.create({ token });
  res.json({
    Message: "user logout",
  });
};
