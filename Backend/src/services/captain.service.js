const captainModel = require("../models/captain.model");

const createCaptain = async function ({
  firstname,
  lastname,
  email,
  password,
  plate,
  color,
  capacity,
  vehicleType,
}) {
  if (!firstname || !email || !password) {
    throw new Error("all input fileds are required");
  }
  return await captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      plate,
      color,
      capacity,
      vehicleType,
    },
  });
};

module.exports = createCaptain;
