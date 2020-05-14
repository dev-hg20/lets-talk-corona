module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  });

  Category.associate = function (models) {
    //a story belongs to an author and belongs to a category due to the foreign keys

    Category.hasMany(models.Story, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Category;
};
