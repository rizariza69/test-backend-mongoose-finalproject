const user = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    try {
      const salt = bcrypt.genSaltSync(7);
      req.body.password = bcrypt.hashSync(req.body.password, salt);

      const users = await user.create(req.body);

      res.status(200).send({
        message: `create success`,
        data: users
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        message: `Register error`
      });
    }
  },
  login: async (req, res) => {
    try {
      const users = await user.findOne({
        email: req.body.email
      });

      if (users === null) {
        res.send("User not found");
      } else {
        // console.log(users.id);

        const token = jwt.sign(
          {
            id: users.id,
            email: users.email
          },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );
        res.status(200).send({
          message: `Login success`,
          token: token
        });
      }
    } catch (error) {
      console.log(error);

      res.status(500).send({
        message: `Login error`
      });
    }
  },
  getUser: async (req, res) => {
    try {
      const users = await user.find();
      res.status(200).send({
        message: `Get user success`,
        data: users
      });
    } catch (error) {
      res.status(500).send({
        message: `Get User error`
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      const users = await user.update(
        {
          id: req.params.id
        },
        {
          $set: {
            fullName: req.body.fullName,
            email: req.body.email
          }
        }
      );
      res.status(200).send({
        message: `update user success`,
        data: users
      });
    } catch (error) {
      res.status(500).send({
        message: `update User error`
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const users = await user.deleteOne({ id: req.params.id });
      res.status(200).send({
        message: `delete user success`,
        data: users
      });
    } catch (error) {
      res.status(500).send({
        message: `delete User error`
      });
    }
  }
};
