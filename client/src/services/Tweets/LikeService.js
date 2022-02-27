import axios from "axios";

const LikeService = (id) => {
  const url = "http://localhost:3001/api/add-like";
  const jwt = window.sessionStorage.getItem("jwt");
  const user = JSON.parse(window.sessionStorage.getItem("user"));

  return axios
    .post(url, {
      token: jwt,
      user_id: user._id,
      tuit_id: id,
    })
    .then((res) => {
      const data = res.data;
      return data;
    });
};

export default LikeService;
