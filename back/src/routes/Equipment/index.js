module.exports = (app) => {
  const Equipment = require("../../controllers/Equipment");
  const router = require("express").Router();
  // const { authJwt } = require("../../middleware");

  // Retrieve all Equipments
  router.get("/",
  // [authJwt.verifyToken, authJwt.isAdmin],
  Equipment.getAllEquipments);

  // Retrieve all Equipments of a Material
  router.get("/material",
  // authJwt.verifyToken,
  Equipment.getAllEquipmentsForMaterial);

  // Retrieve all Equipments of a Cheat
  router.get("/cheat",
  // [authJwt.verifyToken, authJwt.isAdmin],
  Equipment.getAllEquipmentsForCheat);

  // Retrieve a Equipment by Material and Cheat
  router.get("/material/cheat",
  // authJwt.verifyToken,
  Equipment.findEquipmentByMaterialAndCheat);

  // Check if a Cheat is Equipment by a Material
  router.get("/cheat/equipment",
  // authJwt.verifyToken,
  Equipment.isCheatEquipmentByMaterial);

  // Add Cryto to Material's Equipments
  router.post("/add",
  // authJwt.verifyToken,
  Equipment.addCheatToMaterial);

  // Remove Cheat from Material's Equipments
  // Add id ??????????????????
  router.delete("/remove",
  //  authJwt.verifyToken,
  Equipment.removeCheatFromMaterial);

  app.use('/api/equipments', router);
}
