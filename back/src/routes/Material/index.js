module.exports = (app) => {
  const Controller = require("../../controllers/Material");
  const Material = new Controller();
  const router = require("express").Router();
  // const { authJwt } = require("../../middleware");


  // Create a new Material
  router.post("/add",
  // [authJwt.verifyToken, authJwt.isAdmin],
  Material.create);

  // Retrieve all Materials
  router.get("/",
  // [authJwt.verifyToken, authJwt.isAdmin],
  Material.findAll);

  // Retrieve a single Material with id
  router.get("/:id",
  // [authJwt.verifyToken, authJwt.isAdmin],
  Material.findOne);

  // Update a Material with id
  router.put("/update/:id",
  // [authJwt.verifyToken, authJwt.isAdmin],
  Material.update);

  // Delete a Material with id
  router.delete("/remove/:id",
  // [authJwt.verifyToken, authJwt.isAdmin],
  Material.delete);

  app.use('/api/materials', router);
};
