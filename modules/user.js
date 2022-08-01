const { userModel } = require("../models/user");
const bcrypt = require("bcrypt");

module.exports.signUp = async (req, res, next) => {
  try {
    let data = await new userModel({ ...req.body });

    //Hashing password
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(data.password, salt, function (err, hash) {
        data.password = hash;
        data.save();
        res.send(data);
      });
    });
  } catch (err) {
    console.log(err.message);
    res.status(404).send(err.message);
  }
};

exports.reset = async (req, res, next) => {
  // let data = await resetModel.find({});
  // console.log(data);
};

exports.login = async (req, res, next) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("User Not Found");

    //Password Validation
    bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
      if (err) {
        throw err;
      } else if (!isMatch) {
        res.send("Password doesn't match!");
      } else {
        res.send(user);
      }
    })
  } catch (err) {
    console.log(err.message);
    res.status(404).send(err.message);
  }
};
