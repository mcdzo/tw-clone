import axios from "axios";

const SearchUserService = (username) => {
  const jwt = window.sessionStorage.getItem("jwt");
  const url = "http://localhost:3001/api/user";

  return axios
    .post(url, {
      token: jwt,
      username: username,
    })
    .then((res) => {
      const data = res.data;

      return data;
    });
};

export default SearchUserService;
