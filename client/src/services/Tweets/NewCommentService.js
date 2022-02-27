import axios from "axios";

const NewCommentService = (comment) => {
  console.log("", comment);
  const url = "http://localhost:3001/api/add-comment";
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const tuit = JSON.parse(window.sessionStorage.getItem("tuit-detail"));
  const jwt = window.sessionStorage.getItem("jwt");
  return axios
    .post(url, {
      token: jwt,
      tuit_id: tuit._id,
      user_id: user._id,
      comnt_username: user.username,
      comnt_name: user.name,
      comnt_content: comment,
    })
    .then((res) => {
      const data = res.data;
      return data;
    });
};

export default NewCommentService;
