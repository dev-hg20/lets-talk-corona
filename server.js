const express = require("express");
const db = require("./models");

// Set up port to work with Heroku as well
var PORT = process.env.PORT || 8080;

// Configure express app server and middleware
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sync the database and log a message upon success
db.sequelize.sync({force:true}).then(function() {
  app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
  });
});
