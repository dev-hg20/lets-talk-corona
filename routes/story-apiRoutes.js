const router = require("express").Router();
const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");

//GET all the stories
router.get("/api/stories", async function (req, res) {
  const query = {};
  const dbStory = await db.Story.findAll({
    where: query,
    include: [db.User],
  });
  res.json(dbStory);
});

//GET all the stories for a Category
router.get("/api/stories/category/:id", async function (req, res) {
  const dbStory = await db.Story.findAll({
    where: {
      CategoryId: req.params.id,
    },
    include: [db.User],
  });
  res.json(dbStory);
});

//POST for saving a new post
router.post("/api/stories", isAuthenticated, async function (req, res) {
  const dbStory = await db.Story.create(req.body);
  res.json(dbStory);
});

//PUT for updating posts
router.put("/api/stories/", isAuthenticated, async function (req, res) {
  const dbStory = await db.Story.update(req.body, {
    where: {
      id: req.body.id,
    },
  });
  res.json(dbStory);
});

//DELETE posts
router.delete("/api/stories/:id", isAuthenticated, async function (req, res) {
  const dbStory = await db.Story.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json(dbStory);
});

module.exports = router;
