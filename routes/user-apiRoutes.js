const router = require("express").Router();
const db = require("../models");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");

//post for user route, post stories, create story, update story, delete story

// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), function (req, res) {
  res.json(req.user);
});

//logging the user in
router.post("/api/signup", function (req, res) {
  db.User.create({
    name: req.body.name,
    password: req.body.password,
  })
    .then(function () {
      res.redirect(307, "/api/login");
    })
    .catch(function (err) {
      // res.status(401).json(err);
      res
        .status(401)
        .json(
          "Please use letters and numbers only when creating your username."
        );
    });
});

//logging user out
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

// GET data about user
router.get("/api/user_data", function (req, res) {
  if (req.user) {
    res.json({
      name: req.user.name,
      id: req.user.id,
    });
  }
  res.json({});
});

//GET stories for the current user
router.get("/api/user/stories", isAuthenticated, function (req, res) {
  db.Story.findAll({
    where: {
      UserId: req.params.id,
    },
  }).then(function (dbStory) {
    res.json(dbStory);
  });
});

module.exports = router;
