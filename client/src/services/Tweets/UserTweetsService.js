import axios from "axios";

const UserTweetsService = (username) => {
  const jwt = window.sessionStorage.getItem("jwt");
  const url = "http://localhost:3001/api/user-tweets";
  return axios
    .post(url, {
      token: jwt,
      username: username,
    })
    .then((res) => {
      const data = res.data.result;
      return data;
    });
};

export default UserTweetsService;
