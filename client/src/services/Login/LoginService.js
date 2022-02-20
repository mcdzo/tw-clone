import axios from "axios";

const LoginService = ({ email, password }) => {
  const url = "http://localhost:3001/api/log-in";
  return axios
    .post(url, {
      email: email,
      password: password,
    })
    .then((res) => {
      const data = res.data;
      return data;
    });
};

export default LoginService;
