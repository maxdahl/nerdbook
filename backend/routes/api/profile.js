const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const User = require("../../models/User");
const Profile = require("../../models/Profile");

// @route   GET api/profile
// @desc    Get Profile of logged in user
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile
// @desc    Create or Update user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = fillProfileFields(req.body);
    profileFields.user = req.user.id;
    const errors = {};

    Profile.findOne({ handle: profileFields.handle })
      .then(profile => {
        if (profile) {
          if (profile.user.toString() !== req.user.id) {
            errors.handle = "That handle already exists";
            return Promise.reject(errors.handle);
          }
          return profile;
        }
        return Profile.findOne({ user: req.user.id });
      })
      .then(profile => {
        if (!profile) {
          return new Profile(profileFields).save();
        } else {
          profile.set(profileFields);
          return profile.save();
        }
      })
      .then(updatedProfile => {
        res.json(updatedProfile);
      })
      .catch(err => {
        res.status(400).json(errors);
        console.log(err);
      });
  }
);

const fillProfileFields = data => {
  const profileFields = { social: {} };
  if (data.handle) profileFields.handle = data.handle;
  if (data.company) profileFields.company = data.company;
  if (data.website) profileFields.website = data.website;
  if (data.location) profileFields.location = data.location;
  if (data.bio) profileFields.bio = data.bio;
  if (data.status) profileFields.status = data.status;
  if (data.githubusername) profileFields.githubusername = data.githubusername;

  //Skills - Split into array
  if (data.skills) profileFields.skills = data.skills.split(",");

  if (data.youtube) profileFields.social.youtube = data.youtube;
  if (data.instagram) profileFields.social.instagram = data.instagram;
  if (data.facebook) profileFields.social.facebook = data.facebook;
  if (data.twitter) profileFields.social.twitter = data.twitter;
  if (data.linkedin) profileFields.social.linkedin = data.linkedin;

  return profileFields;
};

module.exports = router;
