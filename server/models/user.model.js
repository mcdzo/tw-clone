const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = Schema({
  name: String,
  surname: String,
  username: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("user", userSchema);