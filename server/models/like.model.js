const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LikeSchema = Schema({
  user_id: String,
  tuit_id: String,
});

module.exports = mongoose.model("like", LikeSchema);