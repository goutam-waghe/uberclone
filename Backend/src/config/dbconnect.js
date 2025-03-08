const mongoose = require("mongoose");

async function dbconnection() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/uber");
    console.log("db connected successfully");
  } catch (err) {
    console.log("Mongo db error ", err.message);
  }
}
module.exports = dbconnection;
