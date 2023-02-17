module.exports = (sequelize, Sequelize) => {
  const Bookmark = sequelize.define(
    "Bookmark",
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED, // Already Positive
        primaryKey: true,
        autoIncrement: true,
      }
    },
    {
      tableName: "bookmarks",
      timestamps: false,
    }
  );
  return Bookmark;
};
