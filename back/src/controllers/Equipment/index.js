const Equipment = require("../../models/index")["Equipment"];
const EquipmentService = require("../../services/Equipment");
const { successResponse, errorResponse } = require("../../helpers/index");

class EquipmentController {
  /**
   * @param {Material} material_id
   * @param {Cheat} cheat_id
   * @returns {Promise<Equipment>}
   * @description Add cheat to material
   */
  async addCheatToMaterial(req, res) {
    try {
      const materialId = req.body.material_id;
      const cheatId = req.body.cheat_id;
      const equipment = await EquipmentService.addCheatToMaterial(materialId, cheatId);
      const message = "Cheat added to material successfully";
      return successResponse(req, res, equipment, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {Material} material_id
   * @param {Cheat} cheat_id
   * @returns {Promise<Equipment>}
   * @description Removes a Cheat from a material's Equipments
   */
  async removeCheatFromMaterial(req, res) {
    try {
      const materialId = req.body.material_id;
      const cheatId = req.body.cheat_id;
      const equipment = await EquipmentService.removeCheatFromMaterial(
        materialId,
        cheatId
      );
      const message = "Cheat removed from material successfully";
      return successResponse(req, res, equipment, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {Material} material_id
   * @returns {Promise<Equipment[]>}
   * @description Get all Equipments for a material
   */
  async getAllEquipmentsForMaterial(req, res) {
    try {
      const materialId = req.query.material_id;
      const equipments = await EquipmentService.findAllByMaterialId(materialId);
      const message = "Equipments retrieved successfully";
      return successResponse(req, res, equipments, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {Cheat} cheat_id
   * @returns {Promise<Equipment>}
   * @description Get all equipments for a cheat
   */
  async getAllEquipmentsForCheat(req, res) {
    try {
      const cheatId = req.query.cheat_id;
      const equipments = await EquipmentService.findAllByCheatId(cheatId);
      const message = "Equipments retrieved successfully";
      return successResponse(req, res, equipments, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {Material} material_id
   * @param {Cheat} cheat_id
   * @returns {Promise<Equipment>}
   * @description Find a Equipment by material and cheat
   */
  async findEquipmentByMaterialAndCheat(req, res) {
    try {
      const materialId = req.query.material_id;
      const cheatId = req.query.cheat_id;
      const equipment = await EquipmentService.findOneByMaterialIdAndCheatId(
        materialId,
        cheatId
      );
      const message = "Equipment retrieved successfully";
      return successResponse(req, res, equipment, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @returns {Promise<Equipment[]>}
   * @description Get all Equipments
   */
  async getAllEquipments(req, res) {
    try {
      const equipments = await EquipmentService.findAll();
      const message = "Equipments retrieved successfully";
      return successResponse(req, res, equipments, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {Material} material_id
   * @param {Cheat} cheat_id
   * @returns {Promise<Equipment>}
   * @description Check if a cheat is Equipment by a material
   */
  async isCheatEquipmentByMaterial(req, res) {
    try {
      const materialId = req.query.material_id;
      const cheatId = req.query.cheat_id;
      const equipment = await EquipmentService.isCheatEquipment(
        materialId,
        cheatId
      );
      if (equipment === true) {
        const message = "Cheat is equipment by material";
        return successResponse(req, res, equipment, message);
      }
      const message = "Cheat is not equipment by any material";
      return successResponse(req, res, equipment, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }
}

module.exports = new EquipmentController();
