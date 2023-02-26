const Material = require("../../models/index")["Material"];
const MaterialService = require("../../services/Material");
const Materials = new MaterialService();
const { successResponse, errorResponse } = require("../../helpers/index");

class MaterialController {
  /**
   * @param {Material} Material
   * @returns {Promise<Material>}
   */

  async create(req, res) {
    try {
      const material = await Materials.create(req.body);
      const message = "Material created successfully";
      return successResponse(req, res, material, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @returns {Promise<Material[]>}
   */
  async findAll(req, res) {
    try {
      const materials = await Materials.findAll();
      const message = "Materials retrieved successfully";
      return successResponse(req, res, materials, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {Number} id
   * @returns {Promise<Material>}
   */
  async findOne(req, res) {
    try {
      const materialId = req.params.id;
      const material = await Materials.findOne(materialId);
      const message = "material retrieved successfully";
      return successResponse(req, res, material, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {Number} id
   * @param {Material} Material
   * @returns {Promise<Material>}
   */
  async update(req, res) {
    try {
      const materialId = req.params.id;
      const material = await Materials.update(materialId, req.body);
      const message = "Material updated successfully";
      return successResponse(req, res, material, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {Number} id
   * @returns {Promise<Material>}
   */
  async delete(req, res) {
    try {
      const materialId = req.params.id;
      const material = await Materials.delete(materialId);
      const message = "Material deleted successfully";
      return successResponse(req, res, material, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }


  /**
   * @returns {Promise<Material[]>}
   * @description Get all Materials from Binance format USDT and create them in the database
   * @returns {Promise<Material[]>}
   */
  async setAllMaterials(req, res) {
    try {
      const materials = await Materials.setAllMaterialDB();
      const message = "Materials retrieved successfully";
      return successResponse(req, res, materials, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }
}

module.exports = MaterialController;
