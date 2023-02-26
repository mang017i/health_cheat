module.exports = (sequelize, Sequelize) => {
  const Material = sequelize.define(
    "Material",
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED, // Already Positive
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        unique: true,
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "materials",
      timestamps: false,
    }
  );
  return Material;
};
