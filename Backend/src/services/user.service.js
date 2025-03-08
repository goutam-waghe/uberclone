const userModel = require("../models/user.model");

async function createuser({ firstname, lastname, email, password }) {
  if (!firstname || !email || !password) {
    throw new Error("all input fileds are required");
  }
  console.log("reached");
  return await userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });
}

module.exports = createuser;
