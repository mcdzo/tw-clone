const express = require("express");
const mongoose = require("mongoose");
const auth = require("./middleware/auth");
const cors = require("cors");
const url = "http://localhost:3000/sign-up";
const app = express();

//
mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://127.0.0.1:27017/tuiter", { useNewUrlParser: true })
  .then(() => {
    console.log(">>> Conexion a la base de datos exitosa...!!!");
  })
  .catch((err) => console.log(err));

app.listen(3001, () => {
  console.log("server running on PORT 3001");
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(cors({ origin: url }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRoutes = require("./routes/user.route");

app.use("/api", userRoutes);

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome");
});

module.exports = app;
