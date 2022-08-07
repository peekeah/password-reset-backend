const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: "string",
  gender: { type: "string", enum: ["male", "female", "others"] },
  email: "string",
  password: "string",
  token: "string",
});

module.exports.userModel = mongoose.model("users", userSchema);
