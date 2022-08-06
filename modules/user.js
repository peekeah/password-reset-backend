const { userModel } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {sendOtp} = require("../modules/email");

//Signup
module.exports.signUp = async (req, res, next) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (user)
      return res.status(500).send({ msg: "You are already Registered User" });

    //Hashing password
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    //Storing in DB
    let data = await new userModel({ ...req.body }).save();
    res.send(data);
  } catch (err) {
    console.log(err.message);
    res.status(404).send(err.message);
  }
};

//Login
exports.login = async (req, res, next) => {
  try {
    //Validating Email
    let user = await userModel.findOne({ email: req.body.email });
    if (!user)
      return res.status(500).send({ msg: "You are not Registered User" });

    //Password Validation
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(500).send({ msg: "Password didn't match" });
    res.send(user);
  } catch (err) {
    console.log(err.message);
    res.status(404).send(err.message);
  }
};

//Password Reset
exports.reset = async (req, res, next) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });

    //Generating random string
    const otp = Math.random().toString(36).slice(2);

    //Generate Token
    const token = jwt.sign({otp}, "PRANAY_SECRET_KEY", {
      expiresIn: "1hr",
    });
    user.token = token;
    user.save();

    sendOtp(user.email, otp);

    res.send("OTP has been successfully sent to Email");
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
};
