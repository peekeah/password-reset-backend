const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: "string",
  email: "string",
  password: "string",
  randomString: "string",
});

module.exports.userModel = mongoose.model("users", userSchema);
