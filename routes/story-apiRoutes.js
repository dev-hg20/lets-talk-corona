const router = require("express").Router();
const db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

//GET all the stories
router.get("/api/stories", function (req, res) {
  const query = {};
  db.Story.findAll({
    where: query,
    include: [db.User],
  }).then(function (dbStory) {
    res.json(dbStory);
  });
});

//GET all the stories for EVERYDAY Heroes
router.get("/api/stories/category", function (req, res) {
  db.Story.findAll({
    where: {
      CategoryId: req.params.id,
    },
    include: [db.User],
  }).then(function (dbStory) {
    res.json(dbStory);
  });
});

//POST for saving a new post
router.post("/api/stories", isAuthenticated, function (req, res) {
  db.Story.create(req.body).then(function (dbStory) {
    res.json(dbStory);
  });
});

//PUT for updating posts
router.put("/api/stories/", isAuthenticated, function (req, res) {
  db.Story.update(req.body, {
    where: {
      id: req.body.id,
    },
  }).then(function (dbStory) {
    res.json(dbStory);
  });
});

//DELETE posts
router.delete("/api/stories/:id", isAuthenticated, function (req, res) {
  db.Story.destroy({
    where: {
      id: req.params.id,
    },
  }).then(function (dbStory) {
    res.json(dbStory);
  });
});

module.exports = router;
