const express = require("express");
const user = require("../modules/user");
const email = require("../modules/email");
const router = express.Router();

router.post("/signup", user.signUp);
router.post("/login", user.login);
router.patch("/reset", user.reset);
router.patch('/verify-otp', email.verifyOtp);


module.exports = router;
