const router = require("express").Router();
const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");

/** Error Message to be displayed if the main application page cannot be loaded up */
const pageRenderErrorMessage = `<h1>Something Broke!</h1><br> <h4>Internal Server Error: </h4>
                                Unable to load the Lets Talk Corona page!`;

let storyCategory = null;

/**
 * Fetches all the categories from the database - this method caches categories
 * once they are loaded since this is static data
 * @returns the story categories as objects
 */
async function fetchCategories() {
    if (storyCategory === null) {
        storyCategory = await db.Category.findAll({ raw: true });
    }
    return storyCategory;
}

/**
 * Fetches the selected story from the database
 * @returns the story as an object
 */
async function fetchStory(storyId, userId) {
    return await db.Story.findOne({
        where: {
            id: storyId,
            UserId: userId
        }, raw: true
    });
}

// Login route
router.get("/login", function (request, response) {
    return response.render("login", { currentUser: request.user });
});

// Sign up route
router.get("/signup", function (request, response) {
    return response.render("signup", { currentUser: request.user });
});

// Edit Story route
router.get("/story", isAuthenticated, async function (request, response) {
    try {
        const { query: { id: storyId, callback, category } } = request;
        const pageData = {};
        pageData.category = await fetchCategories();
        pageData.story = await fetchStory(storyId, request.user.id);
        pageData.callbackPage = callback;
        pageData.selectedCategory = category;
        pageData.currentUser = request.user;
        return response.render("edit-story", pageData);
    } catch (error) {
        console.log(`Error on load page: ${error.stack}`);
        return response.status(500).send(pageRenderErrorMessage);
    }
});

// User Profile route
router.get("/profile", isAuthenticated, async function (request, response) {
    try {
        const pageData = {};
        pageData.category = await fetchCategories();
        pageData.currentUser = request.user;
        pageData.selectedCategory = 0;
        return response.render("user-profile", pageData);
    } catch (error) {
        console.log(`Error on load page: ${error.stack}`);
        return response.status(500).send(pageRenderErrorMessage);
    }
});

// Default route - Application main page
router.get("*", async function (request, response) {
    try {
        const { query: { category: categoryId } } = request;
        const pageData = {};
        pageData.category = await fetchCategories();
        pageData.currentUser = request.user;
        pageData.selectedCategory = (categoryId === null) ? 0 : categoryId;
        return response.render("index", pageData);
    } catch (error) {
        console.log(`Error on load page: ${error.stack}`);
        return response.status(500).send(pageRenderErrorMessage);
    }
});


module.exports = router;