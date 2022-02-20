const express = require("express");
const auth = require("../middleware/auth");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const userController = require("../controllers/user.controller");
const tuitController = require("../controllers/tuit.controller");

const router = express.Router();

//test

router.get("/test", (req, res) => {
  return res.status(200).send({
    status: "success",
    message: "Conexion a ruta de prueba exitosa",
  });
});

//user login

router.post("/users", auth, urlencodedParser, userController.getUsers);
router.post("/user", auth, urlencodedParser, userController.getUser);
router.post("/register", userController.Register);
router.post("/log-in", userController.logIn);
router.post("/welcomedos", auth, (req, res) => {
  res.status(200).send("Welcome desde routes");
});

router.post("/test", userController.test);

//user tuit actions

router.post("/new-tuit", auth, urlencodedParser, tuitController.newTuit);
router.post("/all-tuits", auth, urlencodedParser, tuitController.allTuits);
router.post("/single-tuit", auth, urlencodedParser, tuitController.singleTuit);
router.post("/add-like", auth, urlencodedParser, tuitController.addLike);
router.post("/dis-like", auth, urlencodedParser, tuitController.disLike);
router.post("/likes", auth, urlencodedParser, tuitController.allLikes);
router.post("/add-comment", auth, urlencodedParser, tuitController.addComment);
router.post(
  "/like-comment",
  auth,
  urlencodedParser,
  tuitController.likeComment
);

module.exports = router;
