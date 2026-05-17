const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.post(
  "/register",
  async (req, res) => {
    try {

      const {
        name,
        email,
        password,
      } = req.body;

      const userExists =
        await User.findOne({
          email,
        });

      if (userExists) {

        return res
          .status(400)
          .json({
            message:
              "User already exists",
          });
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const user =
        await User.create({
          name,
          email,
          password:
            hashedPassword,
        });

      res.status(201).json({
        message:
          "Registration Successful",
        user,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Registration Failed",
      });
    }
  }
);

router.post(
  "/login",
  async (req, res) => {
    try {

      const {
        email,
        password,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res
          .status(400)
          .json({
            message:
              "Invalid Email",
          });
      }

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res
          .status(400)
          .json({
            message:
              "Invalid Password",
          });
      }

      const token =
        jwt.sign(
          {
            id: user._id,
          },
          "secretkey",
          {
            expiresIn: "7d",
          }
        );

      res.json({
        token,
        user,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Login Failed",
      });
    }
  }
);

module.exports = router;