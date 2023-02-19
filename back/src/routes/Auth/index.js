module.exports = (app) => {
  const Controller = require("../../controllers/Auth");
  const Auth = new Controller();
  const router = require("express").Router();

  // Register new user
  router.post("/register", Auth.register);

  // Login user
  router.post("/login", Auth.login);


  app.use("/api/auth", router);
};
