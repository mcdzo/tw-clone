const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tuitSchema = Schema({
  user_id: String,
  username: String,
  name: String,
  tuit_content: String,
  likes: [],
  comments: [
    {
      comment_user_id: String,
      comment_username: String,
      comment_name: String,
      comment_content: String,
      comment_likes: [],
    },
  ],
});

module.exports = mongoose.model("tuit", tuitSchema);
