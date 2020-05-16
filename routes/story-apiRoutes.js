const router = require("express").Router();
const db = require("../models");

//GET all the stories
router.get("/", function (req, res) {
  const query = {};
  db.Story.findAll({
    where: query,
    include: [db.User],
  }).then(function (dbStory) {
    res.json(dbStory);
  });
});

//POST for saving a new post
router.post("/api/stories", function (req, res) {
  db.Story.create(req.body).then(function (dbStory) {
    res.join(dbStory);
  });
});

//PUT for updating posts
router.put("/api/stories", function (req, res) {
  db.Story.update(req.body, {
    where: {
      id: req.body.id,
    },
  }).then(function (dbStory) {
    res.json(dbStory);
  });
});

//DELETE posts
router.delete("/api/stories/:id", function (req, res) {
  db.Story.destroy({
    where: {
      id: req.params.id,
    },
  }).then(function (dbStory) {
    res.json(dbStory);
  });
});

module.exports = router;
