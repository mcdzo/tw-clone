const validator = require("validator");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const controller = {
  getUsers: (req, res) => {
    User.find({}).exec((err, users) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: ">>>(!) Error al intentar devolver los usuarios",
        });
      }
      console.log(users);
      return res.status(200).send({
        status: "success",
        users,
      });
    });
  },
  getUser: (req, res) => {
    const params = req.body;
    console.log("acacsacas", params);
    User.find({ username: params.username }).exec((err, result) => {
      if (err) {
        return res.status(500).send({
          value: false,
          status: "error",
          message: ">>>(!) Error al intentar devolver el usuario",
        });
      }
      console.log(result);

      const user = {
        _id: result[0]._id,
        name: result[0].name,
        surname: result[0].surname,
        username: result[0].username,
      };
      console.log(user);
      return res.status(200).send({
        value: true,
        status: "success",
        user,
      });
    });
  },

  Register: (req, res) => {
    const params = req.body;
    //console.log(params);

    let validate_name;
    let validate_surname;
    let validate_username;
    let validate_email;
    let validate_password;

    try {
      validate_name = !validator.isEmpty(params.name);
      validate_surname = !validator.isEmpty(params.surname);
      validate_username = !validator.isEmpty(params.username);
      validate_email = !validator.isEmpty(params.email);
      validate_password = !validator.isEmpty(params.password);
    } catch {
      return res.status(200).send({
        status: "error",
        message: ">>>(!) Faltan datos por enviar",
      });
    }

    if (
      validate_name &&
      validate_surname &&
      validate_username &&
      validate_email &&
      validate_password
    ) {
      User.find({
        $or: [
          {
            username: params.username,
          },
          {
            email: params.email,
          },
        ],
      }).exec((err, result) => {
        if (err) {
          return res.status(500).send({
            status: "error",
            err,
          });
        }

        if (result.length === 0) {
          const encryptedPassword = bcrypt.hashSync(params.password, 10);

          const user = new User();

          user.name = params.name;
          user.surname = params.surname;
          user.username = params.username;
          user.email = params.email;
          user.password = encryptedPassword;

          const token = jwt.sign(
            {
              user_id: user.username,
              email: user.email,
            },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );

          user.token = token;

          console.log(user);

          user.save((err) => {
            if (err) {
              return res.status(404).send({
                status: "error",
                message: "!>>>(!) No pudimos guardar el usuario",
              });
            } else {
              return res.status(200).send({
                status: "success",
                value: true,
                user: user,
                message: ">>> Usuario guardado",
                jwt: user.token,
              });
            }
          });
        } else {
          return res.status(200).send({
            status: "error",
            value: false,
            message: ">>>(!) Ese usuario ya existe",
            user: result,
          });
        }
      });
    }
  },
  logIn: (req, res) => {
    try {
      //recibo parametros del usuario: email y password
      const params = req.body;
      console.log(params);

      //valido que no esten vacios
      let validate_email;
      let validate_password;
      try {
        validate_email = !validator.isEmpty(params.email);
        validate_password = !validator.isEmpty(params.password);
      } catch {
        return res.status(200).send({
          status: "error",
          message: ">>>(!) Faltan datos por enviar",
        });
      }

      //si no estan vacios verifico que el user exista en la db
      if (validate_email && validate_password) {
        User.find({ email: params.email }).exec((err, user) => {
          if (err) {
            return res.status(500).send({
              status: "error",
              message: ">>>(!) Error al intentar devolver el usuario",
            });
          }

          if (user.length !== 0) {
            console.log("El usuario existe");
            console.log(user);
            const user_ = user[0];
            console.log(params.password);
            console.log(user_);

            //comparo la contraseña del usuario con la contraseña encriptada de la db.
            if (bcrypt.compareSync(params.password, user_.password)) {
              console.log("la contraseña es correcta");

              const token = jwt.sign(
                { user_id: user_.id, email: user_.email },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
              );
              user_.token = token;
              res.status(200).send({
                status: "success",
                value: true,
                user: user_, ///hace falta que devuelva el user?
                jwt: user_.token,
              });
              console.log(user_.token);
            } else {
              console.log("la contraseña no es correcta");
              return res.status(200).send({
                status: "error",
                value: false,
                message: "Email o contraseña incorrecto",
              });
            }
          } else {
            console.log(">>el usuario no existe");
            return res.status(404).send({
              status: "error",
              value: false,
              message: ">>>(!) El usuario no existe. Email incorrecto",
            });
          }
        });
      }
    } catch (err) {
      return res.status(404).send({
        status: "error",
        message: ">>>(!) No se ha logrado autenticar al usuario",
      });
    }
  },
  test: (req, res) => {
    const params = req.body;

    return res.status(200).send({
      status: "success",
      params,
    });
  },
};

module.exports = controller;
