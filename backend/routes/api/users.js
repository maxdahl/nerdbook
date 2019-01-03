const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const express = require("express");
const router = express.Router();

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200", //size
          r: "pg", //rating
          d: "mm" //default
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar: avatar
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

// @route   POST api/users/login
// @desc    Login User / Return JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) return false;
      return bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) return user;
        else return false;
      });
    })
    .then(user => {
      if (!user) {
        return res
          .status(400)
          .json({ credentials: "Email/Password incorrect" });
      }

      // Success!!
      const payload = {
        id: user.id,
        name: user.name,
        avatar: user.avatar
      };

      jwt.sign(
        payload,
        process.env.JWT_TOKEN,
        { expiresIn: "1d" },
        (err, token) => {
          if (err) throw err;
          res.json({ success: true, token: "Bearer " + token });
        }
      );
    })
    .catch(err => console.log(err));
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.name,
      avatar: req.user.avatar
    });
  }
);
module.exports = router;
