const { Router } = require("express");
const captainRoute = Router();
const { body } = require("express-validator");
const userAuth = require("../middlewares/userAuth");
const captainController = require("../controllers/captain.controller");
const captainAuth = require("../middlewares/captionAuth");

captainRoute.post(
  "/register",

  [
    body("email").isEmail().withMessage("invailid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("first name should be more then 3 charactor"),
    body("password").isLength({ min: 6 }).withMessage("Password must have"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("plat must be at least 3 charactor"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("color must be at least 3 charactor"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("capacity must be at least 1 "),
    body("vehicle.vehicleType")
      .isIn(["car", "auto", "bike"])
      .withMessage("Invalid vehicle type"),
  ],

  captainController.registerCaptain
);
captainRoute.post(
  "/login",
  [
    body("email").isEmail().withMessage("invailid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must have 6 charactor"),
  ],
  captainController.loginCaptain
);
captainRoute.get("/profile", captainAuth, captainController.captainProfile);
captainRoute.get("/logout", captainAuth, captainController.logoutCaptain);

module.exports = captainRoute;
