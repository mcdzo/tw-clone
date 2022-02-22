import axios from "axios";

const SingleTwService = (id) => {
  const jwt = window.sessionStorage.getItem("jwt");
  const url = "http://localhost:3001/api/single-tuit";

  return axios
    .post(url, {
      token: jwt,
      _id: id,
    })
    .then((res) => {
      const tweet = res.data.result;
      return tweet;
    });
};

export default SingleTwService;
