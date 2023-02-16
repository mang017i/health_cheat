module.exports = (app) => {
  const Controller = require("../../controllers/Role");
  const Role = new Controller();
  const router = require("express").Router();
  const { authJwt } = require("../../middleware");


  // Create a new Role
  router.post("/", [authJwt.verifyToken, authJwt.isAdmin], Role.create);

  // Retrieve all Roles
  router.get("/", [authJwt.verifyToken, authJwt.isAdmin], Role.findAll);

  // Retrieve a single Role with id
  router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], Role.findOne);

  // Update a Role with id
  router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], Role.update);

  // Delete a Role with id
  router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], Role.delete);

  app.use('/api/roles', router);
};
