const express = require("express");
const users = require("./userDb");
const posts = require("../posts/postDb");
const router = express.Router();
const validateUserId = require("../middleware/validateUserId");
const validateUser = require("../middleware/validateUsers");
const validatePost = require("../middleware/validatePost");

router.post("/", (req, res) => {
  const { body } = req;

  users.insert(body).then(addUser => {
    res.status(200).json(addUser);
  });
});

// WIP ↓
router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const { body } = req;

  users.insert(body).then(addPost => {
    res.status(200).json(addPost);
  });
});

router.get("/", (req, res) => {
  users
    .get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "Sorry, we failed to get users." });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  const { id } = req.params;

  users
    .getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "Sorry, we failed to get users." });
    });
});

// was working but then decided not to ↓
router.get("/:id/posts", validateUserId, validatePost, (req, res) => {
  const { id } = req.params;
  const { body } = req;

  posts
    .getById(id, body)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Sorry, we failed to get the user's posts." });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  const { id } = req.params;

  users
    .remove(id)
    .then(removed => {
      res.status(200).json(removed);
    })
    .catch(err => {
      res
        .status(404)
        .json({ errorMessage: "Successfully failed destroying the ID.(lol)" });
    });
});

router.put("/:id", validateUser, validateUserId, (req, res) => {
  const { id } = req.params;
  const { body } = req;

  users
    .update(id, body)
    .then(addUser => {
      res.status(200).json(addUser);
    })
    .catch(err => {
      res.status(404).json({ errorMessage: "Failed to add a new ID to user." });
    });
});

module.exports = router;
