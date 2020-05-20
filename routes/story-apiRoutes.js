const router = require("express").Router();
const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");

//GET all the stories
router.get("/", async function (req, res) {
  try {
    const query = {};
    const dbStory = await db.Story.findAll({
      where: query,
      include: [db.User],
      order: [["updatedAt", "DESC"]],
    });
    res.json(dbStory);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//GET all the stories for a Category
router.get("/category/:id", async function (req, res) {
  try {
    const dbStory = await db.Story.findAll({
      where: {
        CategoryId: req.params.id,
      },
      order: [["updatedAt", "DESC"]],
      include: [db.User],
    });
    res.json(dbStory);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//POST for saving a new post
router.post("/", isAuthenticated, async function (req, res) {
  try {
    const dbStory = await db.Story.create(req.body);
    res.json(dbStory);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//PUT for updating posts
router.put("/", isAuthenticated, async function (req, res) {
  try {
    const dbStory = await db.Story.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
    res.json(dbStory);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//DELETE posts
router.delete("/:id", isAuthenticated, async function (req, res) {
  try {
    const dbStory = await db.Story.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(dbStory);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
