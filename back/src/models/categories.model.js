module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define(
    "Category",
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED, // Already Positive
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        unique: true,
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "categories",
      timestamps: false,
    }
  );
  return Category;
};
