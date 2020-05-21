// Requiring bcrypt for password hashing.
const bcrypt = require("bcryptjs");

//creating user model
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-zA-Z0-9]*$/i,
      },
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  });

  //validating the password
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  //Hash their password before user is created
  User.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  User.associate = function (models) {
    User.hasMany(models.Story, {});
  };

  return User;
};
