const Role = require("../../models/index")["Role"];
const RoleService = require("../../services/Role");
const Roles = new RoleService();
const { successResponse, errorResponse } = require("../../helpers/index");


class RoleController {

  /**
   * @param {Role} role
   * @returns {Promise<Role>}
   */
  async create(req, res) {
    try {
      const role = await Roles.create(req.body);
      const message = "Role created successfully";
      return successResponse(req, res, role, message);
    }
    catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @returns {Promise<Role[]>}
   */
  async findAll(req, res) {
    try {
      const roles = await Roles.findAll();
      const message = "Roles retrieved successfully";
      return successResponse(req, res, roles, message);
    }
    catch (error) {
      return errorResponse(req, res, error.message);
    }

  }

  /**
   * @param {Number} id
   * @returns {Promise<Role>}
   */
  async findOne(req, res) {
    try {
      const roleId = req.params.id;
      const role = await Roles.findOne(roleId);
      const message = "Role retrieved successfully";
      return successResponse(req, res, role, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {Number} id
   * @param {Role} role
   * @returns {Promise<Role>}
   */
  async update(req, res) {
    try {
      const roleId = req.params.id;
      const role = await Roles.update(roleId, req.body);
      const message = "Role updated successfully";
      return successResponse(req, res, role, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {Number} id
   * @returns {Promise<Role>}
   */
  async delete(req, res) {
    try {
      const roleId = req.params.id;
      const role = await Roles.delete(roleId);
      const message = "Role deleted successfully";
      return successResponse(req, res, role, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }
}

module.exports = RoleController;
