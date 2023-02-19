module.exports = (app) => {
  const Controller = require("../../controllers/Cheat");
  const Cheat = new Controller();
  const router = require("express").Router();
  // const { authJwt } = require("../../middleware");

  // Create a new Cheat
  router.post("/add",
  // [authJwt.verifyToken, authJwt.isAdmin],
  Cheat.create);

  // Retrieve all Cheats
  router.get("/", Cheat.findAll);

  // Retrieve a single Cheat with id
  router.get("/:id",
  // authJwt.verifyToken,
  Cheat.findOne);

  // Update a Cheat with id
  router.put("/update/:id",
  // [authJwt.verifyToken, authJwt.isAdmin],
  Cheat.update);

  // // Delete a Cheat with id
  router.delete("/remove/:id",
  // [authJwt.verifyToken, authJwt.isAdmin],
  Cheat.delete);

  app.use("/api/cheats", router);
};
