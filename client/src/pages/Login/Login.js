import "./Login.css";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import LoginService from "../../services/Login/LoginService";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (evt) => {
    setEmail(evt.target.value);
  };
  const handlePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (email === "" || password === "") {
      alert("Hay campos obligatorios");
    } else {
      const emailTest =
        /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

      if (emailTest.test(email)) {
        LoginService({ email, password }).then((data) => {
          if (!data.value) {
            alert("Email o contraseña incorrecto");
          } else {
            const jwt = data.jwt;
            const user = data.user;
            window.sessionStorage.setItem("jwt", jwt);
            window.sessionStorage.setItem("user", JSON.stringify(user));
            navigate("/home");
          }
        });
      } else {
        alert("email invalido");
      }
    }
  };

  return (
    <>
      <div className="login-page">
        <h1>Ingresá</h1>
        <form type="submit" className="login-form" onSubmit={onSubmit}>
          <div className="login-row">
            <label>Email (*)</label>
            <input
              type="text"
              placeholder={"example@email.com"}
              onChange={handleEmail}
              value={email}
            ></input>
          </div>
          <div className="login-row">
            <label>Contraseña (*)</label>
            <input
              type="password"
              onChange={handlePassword}
              value={password}
            ></input>
          </div>

          <button className="login-button">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
