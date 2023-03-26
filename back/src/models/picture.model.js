module.exports = (sequelize, Sequelize) => {
  const Picture = sequelize.define(
    "Picture",
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED, // Already Positive
        primaryKey: true,
        autoIncrement: true,
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },

    },
    {
      tableName: "pictures",
      timestamps: false,
    }
  );
  return Picture;
};
