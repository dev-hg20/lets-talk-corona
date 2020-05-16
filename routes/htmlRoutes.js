const express = require("express");

const router = express.Router();

/** Error Message to be displayed if the main application page cannot be loaded up */
const pageRenderErrorMessage = `<h1>Something Broke!</h1><br> <h4>Internal Server Error: </h4>
                                Unable to load the Lets Talk Corona page!`;


// Login route
router.get("/login", async function (request, response) {
    return response.render("login");
});

// Sign up route
router.get("/signup", async function (request, response) {
    return response.render("signup");
});

// Default route - Application main page
router.get("*", async function (request, response) {
    try {
        return response.render("index", {
            isLoggedIn: false,
            category: [{ "id": 1, name: "Browse All" },
            { "id": 1, name: "Everyday Heroes" },
            { "id": 2, name: "Quarantine Quotes" },
            { "id": 3, name: "Healing Space" },
            { "id": 4, name: "Newsworthy" }]
        });
    } catch (error) {
        console.log(`Error on load page: ${error.stack}`);
        return response.status(500).send(pageRenderErrorMessage);
    }
});

module.exports = router;