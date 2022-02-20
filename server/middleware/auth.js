const jwt = require("jsonwebtoken");

require("dotenv").config();
const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (token === null) {
    return res.status(403).send("Se necesita un token para autenticarse");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);

    req.user = decoded;
  } catch (err) {
    console.log(err);

    return res.status(401).send({
      message: "Invalid Token",
      token,
    });
  }
  return next();
};
module.exports = verifyToken;

/*

const jwt = require("jsonwebtoken");

require("dotenv").config();
const config = process.env;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const params = req.body;
  console.log(params);
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("Se necesita un token para autenticarse");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    console.log(decoded);
    req.user = decoded;
    console.log(req.user);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
module.exports = verifyToken;



*/
