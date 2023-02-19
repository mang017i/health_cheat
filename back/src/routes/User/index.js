module.exports = (app) => {
  const Controller = require("../../controllers/User");
  const User = new Controller();
  const router = require("express").Router();
  // const { authJwt } = require("../../middleware");

  // Retrieve all Users
  router.get(
    "/",
    // [authJwt.verifyToken, authJwt.isAdmin],
    // [authJwt.verifyToken, authJwt.ensureAuthenticated],
    User.findAll
  );

  // Retrieve a single User with id
  router.get(
    "/:id",
    // authJwt.verifyToken,
    // [authJwt.verifyToken, authJwt.ensureAuthenticated],
    User.findOne
  );

  // Update a User with id
  router.put("/update/:id",
  //  authJwt.verifyToken,
    User.update);

  // Delete a User with id
  router.delete("/remove/:id",
  // [authJwt.verifyToken, authJwt.isAdmin],
  User.delete);


  app.use("/api/users", router);
};
