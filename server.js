const express = require("express");
const exphbs = require("express-handlebars");
const db = require("./models");
const htmlRoutes = require("./routes/htmlRoutes");
// const apiRoutes = require("./routes/apiRoutes");

// Set up port to work with Heroku as well
var PORT = process.env.PORT || 5050;
const app = express();

// Configure express app server and middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Configure Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Configure routes
// app.use(apiRoutes);
app.use(htmlRoutes);

// Sync the database and log a message upon success
db.sequelize.sync({}).then(function () {
  app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
  });
});
