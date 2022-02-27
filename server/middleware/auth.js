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

