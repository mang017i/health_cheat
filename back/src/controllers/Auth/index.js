const User = require("../../models/index")["User"];
const AuthService = require("../../services/Auth");
const Auth = new AuthService();
const { errorResponse, successLoginResponse, successResponse } = require("../../helpers/index");

class AuthController {
  /**
   * @param {String} email
   * @param {String} password
   * @returns {Promise<User>}
   */

  /**
   * @param {User} user
   * @returns {Promise<User>}
   */
  async register(req, res) {
    try {
      const user = await Auth.register(req.body);
      const message = "User created successfully";
      return successResponse(req, res, user, message);
    } catch (error) {
      return errorResponse(req, res, error.message, 403);
    }
  }

  /**
   * @description Login user
   * @param {String} email
   * @param {String} password
   * @returns {Promise<User>}
   */
  async login(req, res) {
    try {
      const user = await Auth.login(req.body);
      const message = "User logged in successfully";
      return successLoginResponse(req, res, user, message);
    } catch (error) {
      return errorResponse(req, res, error.message, 404);
    }
  }

  // /**
  //  * @description ask for password reset
  //  * @param {String} email
  //  * @returns {Promise<User>}
  //  */
  // async requestPasswordReset(req, res) {
  //  try {
  //   const user = await Auth.requestPasswordReset(req.body);
  //   const message = "Password reset link sent to your email";
  //   return successResponse(req, res, user, message);
  //   } catch (error) {
  //     return errorResponse(req, res, error.message, 404);
  //   }
  // }

}

module.exports = AuthController;
