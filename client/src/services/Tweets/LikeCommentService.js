import axios from "axios";

const LikeCommentService = (id) => {
  const url = "http://localhost:3001/api/like-comment";
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const tuit = JSON.parse(window.sessionStorage.getItem("tuit-detail"));
  const jwt = window.sessionStorage.getItem("jwt");
  return axios
    .post(url, {
      token: jwt,
      user_id: user._id,
      tuit_id: tuit._id,
      comment_id: id,
    })
    .then((res) => {
      const data = res.data;
      return data;
    });
};

export default LikeCommentService;
