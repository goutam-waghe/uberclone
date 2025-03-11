const { Router } = require("express");
const userRoute = Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const userAuth = require("../middlewares/userAuth");

userRoute.post(
  "/register",
  [
    body("email").isEmail().withMessage("invailid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("first name should be more then 3 charactor"),
    body("password").isLength({ min: 6 }).withMessage("Password must have"),
  ],
  userController.registerUser
);

userRoute.post(
  "/login",
  [
    body("email").isEmail().withMessage("invailid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must have"),
  ],
  userController.loginUser
);

userRoute.get("/profile", userAuth, userController.userProfile);
userRoute.get("/logout", userAuth, userController.logoutUser);

module.exports = userRoute;
