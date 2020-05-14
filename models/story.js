module.exports = function (sequelize, DataTypes) {
  const Story = sequelize.define("Story", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1],
    },
  });

  Story.associate = function (models) {
    //a story belongs to an author and belongs to a category due to the foreign keys

    Story.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    Story.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Story;
};
