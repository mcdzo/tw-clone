import axios from "axios";

const DislikeCommentService = (id) => {
  const url = "http://localhost:3001/api/dislike-comment";
  const jwt = window.sessionStorage.getItem("jwt");
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const tuit = JSON.parse(window.sessionStorage.getItem("tuit-detail"));
  return axios
    .post(url, {
      token: jwt,
      comment_id: id,
      tuit_id: tuit._id,
      user_id: user._id,
    })
    .then((res) => {
      const data = res.data;
      return data;
    });
};

export default DislikeCommentService;
