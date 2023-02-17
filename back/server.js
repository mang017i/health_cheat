const dotenv = require('dotenv');
const app = require('./app');
const DatabaseService = require("./src/services/Database");
const DBData = new DatabaseService();
// const CheatService = require("./src/services/Cheat");
// const Cheat = new CheatService();

const setUpExpress = () => {
  dotenv.config({ path: ".env" });

  const port = process.env.PORT || 8080;

  // SYNC DB
  const db = require("./src/models");
  db.sequelize.drop().then(() => {
      console.log("Drop DB...");
    db.sequelize.sync().then(() => {
      console.log("Loading Sync DB...");
      DBData.createMandatoryRoles();
      DBData.createMandatoryUsers();
      DBData.createMandatoryCategories();
      DBData.createMandatoryCheats();
      // DBData.createMandatoryBookmarks();
      console.log("Sync DB loaded successfully.");
    });
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });

  // In case of an error
  app.on("error", (appErr, appCtx) => {
    console.error("app error", appErr.stack);
    console.error("on url", appCtx.req.url);
    console.error("with headers", appCtx.req.headers);
  });
};

setUpExpress();
