module.exports = (app) => {
  const Picture = require("../../controllers/Picture");
  const router = require("express").Router();
  const { upload } = require("../../middleware");

  // Retrieve all Pictures
  router.get("/", Picture.findAll);

  // Retrieve a single Picture with id
  router.get("/:id", Picture.findOne);

  // Retrieve Picture with cheat_id
  router.get("/cheat/:id", Picture.findPictureByCheatId);

  // Create a new Picture
  router.post("/upload", upload, Picture.create);

  // Delete a Picture with id
  router.delete("/:id", Picture.delete);

  // Delete Picture from Cheat
  router.delete("/cheat/:id", Picture.deletePictureFromCheat);

  app.use("/api/pictures", router);
};
