import axios from "axios";

const AllTweetsService = () => {
  const url = "http://localhost:3001/api/all-tuits";
  const jwt = window.sessionStorage.getItem("jwt");
  return axios
    .post(url, {
      token: jwt,
    })
    .then((res) => {
      const tuits = res.data.results;

      return tuits;
    });
};

export default AllTweetsService;
