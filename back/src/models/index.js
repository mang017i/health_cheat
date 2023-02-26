const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
require("dotenv").config();

console.log(__dirname);
const config = require("../config/database.config")[env];
const db = {};

let sequelize;
if (config !== undefined) {
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      {
        host: config.host,
        port: config.port,
        dialect: "mysql",
        logging: false,
      }
    );
  }
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "mysql",
      logging: false,
    }
  );
}

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//= ==============================
// Define all Models below
//= ==============================

db.Role = require("./role.model")(sequelize, Sequelize);
db.User = require("./user.model")(sequelize, Sequelize);
db.Cheat = require("./cheat.model")(sequelize, Sequelize);
db.Category = require("./categories.model")(sequelize, Sequelize);
db.Material = require("./materials.model")(sequelize, Sequelize);
db.Bookmark = require("./bookmark.model")(sequelize, Sequelize);
db.Equipment = require("./equipment.model")(sequelize, Sequelize);

//= ==============================
// Define all Relationships below
//= ==============================

// Role has many Users
db.Role.hasMany(db.User, {
  foreignKey: "role_id",
  as: "users",
});
// User has one Role
db.User.belongsTo(db.Role, {
  foreignKey: "role_id",
  as: "role",
});
// Category has many Cheats
db.Category.hasMany(db.Cheat, {
  foreignKey: "category_id",
  as: "cheats",
});
// Cheat has one Category
db.Cheat.belongsTo(db.Category, {
  foreignKey: "category_id",
  as: "category",
});
// User has many cheat
db.Material.belongsToMany(db.Cheat, {
  through: "Equipment",
  as: "cheats",
  foreignKey: "material_id",
});
// cheat has many User
db.Cheat.belongsToMany(db.Material, {
  through: "Equipment",
  as: "materials",
  foreignKey: "cheat_id",
});
// User has many cheat
db.User.belongsToMany(db.Cheat, {
  through: "Bookmark",
  as: "cheats",
  foreignKey: "user_id",
});
// cheat has many User
db.Cheat.belongsToMany(db.User, {
  through: "Bookmark",
  as: "users",
  foreignKey: "cheat_id",
});


module.exports = db;
