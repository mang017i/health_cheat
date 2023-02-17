module.exports = (sequelize, Sequelize) => {
  const Cheat = sequelize.define(
    "Cheat",
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED, // Already Positive
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "cheats",
      timestamps: false,
    }
  );
  return Cheat;
};
