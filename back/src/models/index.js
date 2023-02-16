const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
require("dotenv").config();
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

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



module.exports = db;
