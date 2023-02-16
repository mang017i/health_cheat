const User = require("../../models/index")["User"];
const UserService = require("../../services/User");
const Users = new UserService();
const { successResponse, errorResponse } = require("../../helpers/index");

class UserController {

  /**
   * @returns {Promise<User[]>}
   */
  async findAll(req, res) {
    try {
      const users = await Users.findAll();
      const message = "Users fetched successfully";
      return successResponse(req, res, users, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {Number} id
   * @returns {Promise<User>}
   */
  async findOne(req, res) {
    try {
      const userId = req.params.id;
      const user = await Users.findOne(userId);
      const message = "User fetched successfully";
      return successResponse(req, res, user, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {Number} id
   * @param {User} user
   * @returns {Promise<User>}
   */
  async update(req, res) {
    try {
      const userId = req.params.id;
      const user = await Users.update(userId, req.body);
      const message = "User updated successfully";
      return successResponse(req, res, user, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {Number} id
   * @returns {Promise<User>}
   */
  async delete(req, res) {
    try {
      const userId = req.params.id;
      const user = await Users.delete(userId);
      const message = "User deleted successfully";
      return successResponse(req, res, user, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  // async updatePassword(req, res) {
  //   try {
  //     const userId = req.params.id;
  //     const password = req.body.password;
  //     const user = await Users.updatePassword(userId, password);
  //     const message = "User password updated successfully";
  //     return successResponse(req, res, user, message);
  //   } catch (error) {
  //     return errorResponse(req, res, error.message);
  //   }
  // }

}

module.exports = UserController;
