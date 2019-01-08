const express = require("express");
const router = express.Router();
const passport = require("passport");

const Post = require("../../models/Post");

const validatePostInput = require("../../validation/post");

// @route   Get api/posts
// @desc    Get posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Something went wrong");
    });
});

// @route   Get api/posts/post_id
// @desc    Get post by id
// @access  Public
router.get("/:post_id", (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      if (post) {
        return res.json(post);
      }
      res.status(404).json({ nopostfound: "Post not found" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Something went wrong");
    });
});

// @route   POST api/posts/like/post_id
// @desc    Like a post
// @access  Private
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        if (!post) {
          res.status(404).json({ nopostfound: "No Post found" });
          return Promise.reject("no post found");
        }

        const userLike = post.likes.filter(
          like => like.user.toString() === req.user.id
        );

        if (userLike.length > 0) {
          res
            .status(400)
            .json({ alreadyliked: "User already liked this post" });
          return Promise.reject("User already liked this post");
        }

        post.likes.push({ user: req.user });
        return post.save();
      })
      .then(post => {
        return res.json(post);
      })
      .catch(err => {
        console.log(err);
        if (!res.headersSent) res.status(500).send("Something went wrong");
      });
  }
);

// @route   POST api/posts/comment/:post_id
// @desc    Add comment to post
// @access  Private
router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    Post.findById(req.params.post_id)
      .then(post => {
        if (!post) {
          res.status(404).json({ nopostfound: "No post found" });
          return Promise.reject("No Post found");
        }

        const newComment = {
          text: req.body.text,
          authorname: req.user.name,
          avatar: req.user.avatar,
          user: req.user.id
        };

        post.comments.unshift(newComment);
        return post.save();
      })
      .then(post => {
        res.json(post);
      })
      .catch(err => {
        console.log(err);
        if (!res.headersSent) res.status(500).send("Something went wrong...");
      });
  }
);

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const newPost = new Post({
      text: req.body.text,
      authorname: req.user.name,
      avatar: req.user.avatar,
      user: req.user.id
    });

    newPost
      .save()
      .then(post => {
        res.json(post);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Something went wrong...");
      });
  }
);

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        if (!post) {
          res.status(404).json({ nopostfound: "No post found" });
          return Promise.reject("No post found");
        }

        const userComment = post.comments.filter(
          c =>
            c._id.toString() === req.params.comment_id &&
            c.user.toString() === req.user.id
        );
        //console.log(req.params.comment_id, post.comments);
        if (userComment.length === 0) {
          res.status(404).json({ commentnotfound: "Comment not found" });
          return Promise.reject("Comment not found");
        }

        commentIndex = post.comments.indexOf(userComment[0]);
        if (commentIndex >= 0) {
          post.comments.splice(commentIndex);
          return post.save();
        }

        return post;
      })
      .then(post => {
        res.json(post);
      })
      .catch(err => {
        console.log(err);
        if (!res.headersSent) res.status(500).send("Something went wrong...");
      });
  }
);

// @route   DELETE api/posts/like/post_id
// @desc    Like a post
// @access  Private
router.delete(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        if (!post) {
          res.status(404).json({ nopostfound: "No Post found" });
          return Promise.reject("no post found");
        }

        const userLike = post.likes.filter(
          like => like.user.toString() === req.user.id
        );
        if (userLike.length === 0) {
          res
            .status(400)
            .json({ alreadyliked: "User didn't liked this post yet" });
          return Promise.reject("User didn't liked this post yet");
        }

        const removeIndex = post.likes.indexOf(userLike[0]);

        if (removeIndex >= 0) {
          post.likes.splice(removeIndex);
          return post.save();
        }

        return post;
      })
      .then(post => {
        return res.json(post);
      })
      .catch(err => {
        console.log(err);
        if (!res.headersSent) res.status(500).send("Something went wrong");
      });
  }
);

// @route   DELETE api/posts/:post_id
// @desc    Delete a post
// @access  Private
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findOne({ user: req.user.id, _id: req.params.post_id })
      .then(post => {
        if (!post) {
          return res.status(404).json({ nopostfound: "Post not found" });
        }

        post.remove();
        return res.json({ success: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Something went wrong...");
      });
  }
);

module.exports = router;
