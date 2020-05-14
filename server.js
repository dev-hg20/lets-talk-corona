const express = require("express");
const db = require("./models");

// Set up port to work with Heroku as well
var PORT = process.env.PORT || 5050;
const app = express();

// Configure express app server and middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
// var exphbs = require("express-handlebars");
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// //Import routes
// app.use("/api", apiRoutes);

// Sync the database and log a message upon success
db.sequelize.sync({}).then(function () {
  app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
  });
});
