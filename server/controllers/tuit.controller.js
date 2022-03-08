const validator = require("validator");
const User = require("../models/user.model");
const Tuit = require("../models/tuit.model");
const Like = require("../models/like.model");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const controller = {
  allTuits: (req, res) => {
    const params = req.body;

    Tuit.find({}).exec((err, results) => {
      if (err) {
        return res.status(404).send({
          status: "error",
          message: ">>> no se puedo consegir los tuits",
          err,
        });
      }
      return res.status(200).send({
        status: "success",
        results,
      });
    });
  },

  userTweets: (req, res) => {
    console.log(req.body);
    const params = req.body;
    try {
      Tuit.find({ username: params.username }).exec((err, result) => {
        console.log(result);
        return res.status(200).send({
          result: result,
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(404).send(err);
    }
  },
  singleTuit: (req, res) => {
    const params = req.body;

    Tuit.find({ _id: params._id }).exec((err, result) => {
      if (err) {
        return res.status(404).send({
          status: "error",
          value: false,
          message: ">>> no se puedo consegir el tuit",
          err,
        });
      }
      console.log(result);
      return res.status(200).send({
        status: "success",
        value: true,
        message: ">>>Tuit encontrado",
        result: result[0],
      });
    });
  },

  newTuit: (req, res) => {
    try {
      const params = req.body;

      //validar que los datos no esten vacios
      let validate_user_id;
      let validate_tuit_content;

      try {
        validate_user_id = !validator.isEmpty(params.user_id);
        validate_tuit_content = !validator.isEmpty(params.tuit_content);
      } catch {
        return res.status(200).send({
          status: "error",
          message: ">>>(!) Faltan datos por enviar",
        });
      }

      //primero validar el usuario del tuit por id

      User.find({ _id: params.user_id }).exec((err, result) => {
        //guardar tuit

        if (result.length !== 0) {
          const tuit = new Tuit();

          tuit.user_id = params.user_id;
          tuit.name = params.name;
          tuit.username = params.username;
          tuit.tuit_content = params.tuit_content;

          tuit.save((err, result) => {
            if (err) {
              return res.status(404).send({
                status: "error",
                message: ">>>>> No se pudo guardar el tuit",
                params,
              });
            }
            console.log(result);

            return res.status(200).send({
              result,
            });
          });
        } else {
          return res.status(404).send({
            status: "error",
            message: ">>>>> Necesitas registrarte",
            params,
          });
        }
      });
    } catch (err) {
      return res.status(404).send({
        status: "error",
        message: ">>>>> No se pudo guardar el tuit",
        params,
      });
    }
  },

  addLike: (req, res) => {
    try {
      const params = req.body;

      if (!params.user_id || !params.tuit_id) {
        return res.status(200).send({
          status: "error",
          message: ">>> faltan datos por enviar!",
        });
      } else {
        const like = new Like();

        like.user_id = params.user_id;
        like.tuit_id = params.tuit_id;
        //que un usuario no pueda likear dos veces!

        Tuit.find({ _id: params.tuit_id }).exec((err, result) => {
          if (err) {
            return res.status(404).send({
              status: "error",
              message: ">>> no se puedo consegir los tuits",
              err,
            });
          }

          const tuit = result[0];
          const l = tuit.likes;
          const query = l.find((el) => el === params.user_id);

          if (query === undefined) {
            Tuit.updateOne(
              { _id: params.tuit_id },
              {
                $push: { likes: params.user_id },
              }
            ).exec(() => {
              Tuit.find({ _id: params.tuit_id }).exec((err, result) => {
                if (err) {
                  return res.status(404).send({
                    status: "error",
                    message: ">>> no se puedo consegir los tuits",
                    err,
                  });
                }
                console.log(result[0]);
                return res.status(200).send({
                  result: result[0],
                });
              });
            });
          } else {
            return res.status(200).send({
              message: "no puede likear dos veces",
              result: null,
            });
          }
        });
      }
    } catch (err) {
      return res.status(200).send({
        status: "error",
        message: ">>> No se pudo dar like!",
      });
    }
  },
  disLike: (req, res) => {
    try {
      const params = req.body;
      console.log(params);

      Tuit.updateOne(
        { _id: params.tuit_id },
        {
          $pull: { likes: params.user_id },
        }
      ).exec(() => {
        Tuit.find({ _id: params.tuit_id }).exec((err, result) => {
          if (err) {
            return res.status(404).send({
              status: "error",
              message: ">>> no se puedo consegir los tuits",
              err,
            });
          }
          return res.status(200).send({
            status: "success",
            value: true,
            message: "Like eliminado con exito",
            result: result[0],
          });
        });
      });
    } catch (err) {
      return res.status(200).send({
        status: "error",
        message: ">>> No se pudo dar dis-like!",
      });
    }
  },

  allLikes: (req, res) => {
    const params = req.body;

    Like.find({}).exec((err, results) => {
      if (err) {
        return res.status(404).send({
          status: "error",
          message: ">>> no se puedo consegir los tuits",
          err,
        });
      }
      return res.status(200).send({
        status: "success",
        results,
      });
    });
  },
  addComment: (req, res) => {
    const params = req.body;

    if (!params.user_id || !params.tuit_id) {
      return res.status(200).send({
        status: "error",
        value: false,
        message: ">>> Faltan datos por enviar! ",
      });
    } else {
      Tuit.find({ _id: params.tuit_id }).exec((err, result) => {
        if (err) {
          return res.status(404).send({
            status: "error",
            value: false,
            message: ">>> No se encontró el tuit!!",
          });
        }

        Tuit.updateOne(
          { _id: params.tuit_id },
          {
            $push: {
              comments: {
                comment_user_id: params.user_id,
                comment_username: params.comnt_username,
                comment_name: params.comnt_name,
                comment_content: params.comnt_content,
              },
            },
          }
        ).exec(() => {
          Tuit.find({ _id: params.tuit_id }).exec((err, result) => {
            if (err) {
              return res.status(404).send({
                status: "error",
                message: ">>> no se puedo consegir los tuits",
                err,
              });
            }

            return res.status(200).send({
              result: result[0],
              value: true,
            });
          });
        });
      });
    }
  },
  likeComment: (req, res) => {
    const params = req.body;

    Tuit.find({ _id: params.tuit_id }).exec((err, result) => {
      if (err) {
        return res.status(404).send({
          status: "error",
          message: ">>> no se puedo consegir los tuits",
          err,
        });
      }

      const comments = result[0].comments;
      const comment = comments.filter((el) => el.id === params.comment_id); //estaba dando como return "new ObjectID("..."), entonces le saqué el underscore "_"
      const comment_likes = comment[0].comment_likes;
      const comment_like = comment_likes.filter((el) => el === params.user_id);

      if (comment_like.length === 0) {
        Tuit.updateOne(
          { "comments._id": params.comment_id },
          {
            $push: {
              "comments.$.comment_likes": params.user_id,
            },
          }
        ).exec(() => {
          Tuit.find({ _id: params.tuit_id }).exec((err, result) => {
            if (err) {
              return res.status(404).send({
                status: "error",
                message: ">>> no se puedo consegir el tuit",
                err,
              });
            }
            console.log(result[0]);
            const updatedComments = result[0].comments;
            const updatedComment = updatedComments.filter(
              (el) => el.id === params.comment_id
            );
            return res.status(200).send({
              result: updatedComment[0],
            });
          });
        });
      } else {
        console.log("este user ya likeo este comentario");
        return res.status(200).send({
          status: ">>> Error",
          message: "Este user ya likeo el comentario",
          result: null,
        });
      }
    });
  },
  disLikeComment: (req, res) => {
    const params = req.body;
    console.log(params);
    let validate_user_id;
    let validate_comment_id;
    let validate_tuit_id;

    try {
      validate_user_id = validator.isEmpty(params.user_id);
      validate_tuit_id = validator.isEmpty(params.comment_id);
      validate_tuit_id = validator.isEmpty(params.tuit_id);

      if (validate_comment_id || validate_tuit_id || validate_user_id) {
        console.log(err, "faltan datos por enviar");
        return res.status(200).send({
          status: "error",
          message: ">>>(!) Faltan datos por enviar",
        });
      }
      Tuit.updateOne(
        { "comments._id": params.comment_id },
        {
          $pull: {
            "comments.$.comment_likes": params.user_id,
          },
        }
      ).exec((err, result) => {
        if (err) {
          return res.status(404).send({
            status: "error",
            message: ">>> no se puedo consegir el tuit",
            err,
          });
        }
        Tuit.find({ _id: params.tuit_id }).exec((err, result) => {
          if (err) {
            return res.status(404).send({
              status: "error",
              message: ">>> no se puedo consegir el tuit",
              err,
            });
          }
          console.log(result[0]);
          const updatedComments = result[0].comments;
          const updatedComment = updatedComments.filter(
            (el) => el.id === params.comment_id
          );
          return res.status(200).send({
            result: updatedComment[0],
          });
        });
      });
    } catch (err) {
      console.log(err, "faltan datos por enviar");
      return res.status(200).send({
        status: "error",
        message: ">>>(!) Faltan datos por enviar",
      });
    }
  },
};

module.exports = controller;
