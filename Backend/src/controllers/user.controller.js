const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const createuser = require("../services/user.service");

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

module.exports.loginUser;
