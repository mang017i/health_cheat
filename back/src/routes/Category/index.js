module.exports = (app) => {
  const Controller = require("../../controllers/Category");
  const Category = new Controller();
  const router = require("express").Router();
  // const { authJwt } = require("../../middleware");


  // Create a new Category
  router.post("/add",
  // [authJwt.verifyToken, authJwt.isAdmin],
  Category.create);

  // Retrieve all Categories
  router.get("/",
  // [authJwt.verifyToken, authJwt.isAdmin],
  Category.findAll);

  // Retrieve a single Category with id
  router.get("/:id",
  // [authJwt.verifyToken, authJwt.isAdmin],
  Category.findOne);

  // Update a Category with id
  router.put("/update/:id",
  // [authJwt.verifyToken, authJwt.isAdmin],
  Category.update);

  // Delete a Category with id
  router.delete("/remove/:id",
  // [authJwt.verifyToken, authJwt.isAdmin],
  Category.delete);

  app.use('/api/categories', router);
};
