import axios from "axios";

const NewTwService = (tuit) => {
  const url = "http://localhost:3001/api/new-tuit/";

  return axios.post(url, tuit).then((res) => {
    const tuit = res.data.result;
    console.log(res);
    return tuit;
  });
};

export default NewTwService;
