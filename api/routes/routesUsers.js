var mongoose = require("mongoose");
var Users = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = function(app) {
  app.post("/signup", (req, res) => {
    const jwt_key = process.env.JWT_KEY;
    Users.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length > 0) {
          return res.status(409).send({ error: "E-mail already exists" });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({
                error: err.message
              });
            } else {
              const user = new Users({
                _id: new mongoose.Types.ObjectId(),
                userID: req.body.userID,
                name: req.body.name,
                email: req.body.email,
                password: hash
              });
              user
                .save()
                .then(() => {
                  const token = jwt.sign(
                    { email: user.email, userId: user._id },
                    jwt_key,
                    {
                      expiresIn: "1h"
                    }
                  );
                  res.status(201).json({
                    message: "User created",
                    user,
                    token
                  });
                })
                .catch(err => {
                  res.status(400).send({ error: err.message });
                });
            }
          });
        }
      })
      .catch(err => {
        if (err) return res;
      });
  });

  app.post("/login", (req, res) => {
    const jwt_key = process.env.JWT_KEY;
    Users.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          res.status(200).json({ error: "Auth failed" });
        } else {
          bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err || !result) res.status(200).json({ error: "Auth failed" });
            if (result) {
              const token = jwt.sign(
                { email: user[0].email, userId: user[0]._id },
                jwt_key,
                {
                  expiresIn: "1h"
                }
              );
              return res.status(200).json({ message: "Success", token });
            }
          });
        }
      })
      .catch(err => {
        if (err) res.status(500).json({ error: err.message });
      });
  });
};
