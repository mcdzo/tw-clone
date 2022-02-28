import axios from "axios";

const DisLikeService = (id) => {
  const url = "http://localhost:3001/api/dis-like";
  const jwt = window.sessionStorage.getItem("jwt");
  const user = JSON.parse(window.sessionStorage.getItem("user"));

  return axios
    .post(url, {
      token: jwt,
      tuit_id: id,
      user_id: user._id,
    })
    .then((res) => {
      const data = res.data;
      return data;
    });
};

export default DisLikeService;
