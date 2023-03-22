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
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      step: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      recommendation: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      creator: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Anonymous",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      tableName: "cheats",
      timestamps: false,
    }
  );
  return Cheat;
};
