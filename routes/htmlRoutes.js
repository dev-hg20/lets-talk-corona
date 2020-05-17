const router = require("express").Router();
const db = require("../models");

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

// Login route
router.get("/login", function (request, response) {
    return response.render("login", { currentUser: request.user });
});

// Sign up route
router.get("/signup", function (request, response) {
    return response.render("signup", { currentUser: request.user });
});

// Default route - Application main page
router.get("*", async function (request, response) {
    try {
        const pageData = {};
        pageData.category = await fetchCategories();
        pageData.currentUser = request.user;
        return response.render("index", pageData);
    } catch (error) {
        console.log(`Error on load page: ${error.stack}`);
        return response.status(500).send(pageRenderErrorMessage);
    }
});


module.exports = router;