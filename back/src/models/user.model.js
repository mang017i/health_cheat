module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED, // Already Positive
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        unique: true,
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        unique: true,
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // phone: {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // },
      // address: {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // },
      // city: {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );
  return User;
};
