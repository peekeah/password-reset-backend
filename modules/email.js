const nodeMailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
const { userModel } = require("../models/user");
const jwt = require("jsonwebtoken");

exports.sendOtp = async (userEmail, otp, req, res) => {


  const transporter = nodeMailer.createTransport(
    smtpTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    })
  );

  let mailOptions = {
    from: process.env.MAIL_USERNAME, // sender address
    to: userEmail, // list of receivers
    subject: "Otp for resetting password", // Subject line
    text: `Your Otp is ${otp}`, // plain text body
    // html: "<b>NodeJS Email Tutorial</b>", // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    // console.log("Message %s sent: %s", info.messageId, info.response);
    // res.send("Message Sent Successfully");
  });
};

exports.verifyOtp = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  const token = jwt.verify(user.token, "PRANAY_SECRET_KEY");
  // console.log(user, token);
  if (token.otp !== req.body.otp) return res.status(500).send("Otp didn't match");

  res.send("otp matched");
};
