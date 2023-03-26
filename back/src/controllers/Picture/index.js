const Picture = require("../../models/index")["Picture"];
const Pictures = require("../../services/Picture");
const { successResponse, errorResponse } = require("../../helpers/index");

class PictureController {
  /**
   * @param {Picture} picture
   * @returns {Promise<Picture>}
   */
  async create(req, res) {
    try {
      const { cheat_id } = req.body;
      const path = req.file.originalname;
      const picture = await Pictures.create(cheat_id, path);
      const message = "Picture uploaded successfully";
      return successResponse(req, res, picture, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @returns {Promise<Picture[]>}
   */
  async findAll(req, res) {
    try {
      const pictures = await Pictures.findAll();
      const message = "Pictures retrieved successfully";
      return successResponse(req, res, pictures, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {Number} id
   * @returns {Promise<Picture>}
   */
  async findOne(req, res) {
    try {
      const pictureId = req.params.id;
      const picture = await Pictures.findOne(pictureId);
      const message = "Picture retrieved successfully";
      return successResponse(req, res, picture, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {Number} id
   * @returns {Promise<Picture>}
   */
  async delete(req, res) {
    try {
      const pictureId = req.params.id;
      const picture = await Pictures.delete(pictureId);
      const message = "Picture deleted successfully";
      return successResponse(req, res, picture, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {Number} id
   * @param {Number} cheat_id
   * @returns {Promise<Picture>}
   * @description This method is used to delete the Picture by cheat_id
   */
  async deletePictureFromCheat(req, res) {
    try {
      const cheatId = req.params.id;
      const picture = await Pictures.deletePictureByCheatId(cheatId);
      const message = "Picture deleted successfully";
      return successResponse(req, res, picture, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {Number} cheat_id
   * @returns {Promise<Picture>}
   */
  async findPictureByCheatId(req, res) {
    try {
      const cheatId = req.params.id;
      const picture = await Pictures.findPictureByCheatId(cheatId);
      const message = "Picture retrieved successfully";
      return successResponse(req, res, picture, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }
}

module.exports = new PictureController();
