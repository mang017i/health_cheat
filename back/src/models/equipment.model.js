module.exports = (sequelize, Sequelize) => {
  const Equipment = sequelize.define(
    "Equipment",
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED, // Already Positive
        primaryKey: true,
        autoIncrement: true,
      }
    },
    {
      tableName: "equipments",
      timestamps: false,
    }
  );
  return Equipment;
};
