module.exports = (app) => {
  const Controller = require("../../controllers/User");
  const { authJwt } = require("../../middleware");
  const User = new Controller();
  const router = require("express").Router();

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
  router.put("/:id",
  //  authJwt.verifyToken,
    User.update);

  // Delete a User with id
  router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], User.delete);

  // Update a User password with id
  // router.put("/:id/password", User.updatePassword);

  app.use("/api/users", router);
};
