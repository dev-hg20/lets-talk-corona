const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const passport = require("./config/passport");
const db = require("./models");
const htmlRoutes = require("./routes/htmlRoutes");
const apiUserRoutes = require("./routes/user-apiRoutes");
const apiStoriesRoutes = require("./routes/story-apiRoutes");

// Set up port to work with Heroku as well
var PORT = process.env.PORT || 5050;
const app = express();

// Configure express app server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Configure express to use sessions and passport middleware for authentication
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Configure Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Configure routes
app.use(apiUserRoutes);
app.use(apiStoriesRoutes);
app.use(htmlRoutes);

// Sync the database and log a message upon success
db.sequelize.sync({}).then(function () {
  app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
  });
});
