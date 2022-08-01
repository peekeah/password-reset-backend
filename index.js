const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./routes/user");

dotenv.config();
const app = express();
app.use(express.json());

app.use("/", router);

app.get("/", async (req, res, next) => {
  res.send('Password Reset')
})

try {
  mongoose.connect(process.env.MONGO_URL);
} catch (err) {
  console.log(err);
}

app.listen(process.env.PORT || 5000, () => {
  console.log(`App is started on ${process.env.PORT || 5000}`);
});
