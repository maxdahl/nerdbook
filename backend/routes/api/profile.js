const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const User = require("../../models/User");
const Profile = require("../../models/Profile");
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

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

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      return res.json(profiles);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send("Something went wrong...");
    });
});

// @route   GET api/profile/handle/:handle
// @desc    Get user profile by handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch(err => {
      console.log(err);
      res.status(404).send("There is no profile for this user");
    });
});

// @route   GET api/profile/user/:user_id
// @desc    Get user profile by user_id
// @access  Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch(err => {
      console.log(err);
      res.status(404).send("There is no profile for this user");
    });
});

// @route   POST api/profile
// @desc    Create or Update user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const profileFields = fillProfileFields(req.body);
    profileFields.user = req.user.id;

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
        updatedProfile.populate(
          { path: "user", select: "name avatar" },
          (err, profile) => {
            if (err) throw err;
            res.json(profile);
          }
        );
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

// @route   POST api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        return User.findOneAndRemove({ _id: req.user.id });
      })
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Something went wrong...");
      });
  }
);

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          description: req.body.description,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current
        };

        profile.experience.unshift(newExp);
        return profile.save();
      })
      .then(profile => {
        res.json(profile);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Something went wrong...");
      });
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.experience.indexOf(
          profile.experience.find(
            item => item.id.toString() === req.params.exp_id
          )
        );

        if (removeIndex >= 0) {
          profile.experience.splice(removeIndex);
          return profile.save();
        }

        return profile;
      })
      .then(profile => {
        return res.json(profile);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Something went wrong...");
      });
  }
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newEdu = {
          school: req.body.school,
          degree: req.body.degree,
          field: req.body.field,
          description: req.body.description,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current
        };

        profile.education.unshift(newEdu);
        return profile.save();
      })
      .then(profile => {
        res.json(profile);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Something went wrong...");
      });
  }
);

// @route   DELETE api/profile/education/:exp_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.education.indexOf(
          profile.education.find(
            item => item.id.toString() === req.params.edu_id
          )
        );

        if (removeIndex >= 0) {
          profile.education.splice(removeIndex);
          return profile.save();
        }

        return profile;
      })
      .then(profile => {
        return res.json(profile);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Something went wrong...");
      });
  }
);

module.exports = router;
