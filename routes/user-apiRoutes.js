const router = require("express").Router();
const db = require("../models");
const passport = require("../config/passport");

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
      res.status(401).json(err);
    });
});

//logging user out
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

// GET data about user
router.get("/api/user_data", function (req, res) {
  if (!req.user) {
    res.json({});
  } else {
    res.json({
      name: req.user.name,
      id: req.user.id,
    });
  }
});

module.exports = router;
