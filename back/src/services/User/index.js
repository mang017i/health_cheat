const User = require("../../models/index")["User"];
const Role = require("../../models/index")["Role"];
const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");

const bcrypt = require("bcryptjs");
const { access } = require("fs");

class UserService {
  constructor() {
    this.user = User;
  }

  /**
   * @param {User} user
   * @returns {Promise<User>}
   */
  async create(user) {
    const userFoundEmail = await this.checkUserEmail(user.email);
    const userFoundUsername = await this.checkUserUsername(user.username);

    if (userFoundEmail) {
      throw new Error("User already exists with this email");
    }

    if (userFoundUsername) {
      throw new Error("User already exists with this username");
    }

    // Hash password
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;

    return await this.user.create(user).then((user) => {
      if (user) {
        return user;
      } else {
        throw new Error("User not created");
      }
    });
  }

  /**
   * @returns {Promise<User[]>}
   */
  async findAll() {
    return await this.user
      .findAll({})
      .then((users) => {
        if (users) {
          return users;
        } else {
          throw new Error("Any users found");
        }
      });
  }

  /**
   * @param {Number} id
   * @returns {Promise<User>}
   */
  async findOne(id) {
    return await this.user
      .findOne({
        where: {
          id: id,
        },
      })
      .then((user) => {
        if (user) {
          return user;
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  /**
   * @param {Number} id
   * @param {User} user
   * @returns {Promise<User>}
   */
  async update(id, user) {

    if (user.password) {
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(user.password, salt);
      user.password = hash;
    }

    return await this.user
      .update(user, {
        where: {
          id: id,
        },
      })
      .then((num) => {
        if (num == 1) {
          const user = this.findOne(id);
          const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // 24 hours
            algorithm: "HS256",
          });
          return token;
        } else {
          throw new Error("User not found");
        }
      });
  }

  /**
   * @param {Number} id
   * @returns {Promise<User>}
   */
  async delete(id) {
    return await this.user
      .destroy({
        where: {
          id: id,
        },
      })
      .then((num) => {
        if (num == 1) {
          return this.findAll();
        } else {
          throw new Error("User not found with id: " + id);
        }
      });
  }

  /**
   * @param {String} email
   * @returns {Promise<User>}
   */
  async findByEmail(email) {
    return await this.user.findOne({
      where: {
        email: email,
      },
      include: [
        {
          model: Role,
          as: "role",
        },
      ],
    });
  }

  /**
   * @param {String} username
   * @returns {Promise<User>}
   */
  async findByUsername(username) {
    return await this.user.findOne({
      where: {
        username: username,
      },
    });
  }

  /**
   * @param {String} email
   * @param {String} password
   * @returns {Promise<User>}
   */
  async findByEmailAndPassword(email, password) {
    return await this.user.findOne({
      where: {
        email: email,
        password: password,
      },
    });
  }

  /** USER HELPERS **/

  /**
   * @param {String} email
   * @returns {Boolean}
   * @description Check if user email already exists
   */
  async checkUserEmail(email) {
    const userFound = await this.findByEmail(email);
    return userFound ? true : false;
  }

  /**
   * @param {String} username
   * @returns {Boolean}
   * @description Check if user username already exists
   */
  async checkUserUsername(username) {
    const userFound = await this.findByUsername(username);
    return userFound ? true : false;
  }

  /**
   * @param {String} email
   * @returns {Boolean}
   * @description Check if role is Admin
   */
  async checkUserisAdmin(id) {
    const userFound = await this.findOne(id);
    return userFound.role.name === "admin" ? true : false;
  }

  /**
   * @param {Number} id
   * @param {String} newPassword
   * @description Update user password
   * @returns {Promise<User>}
   */
  // async updatePassword(id, newPassword) {
  //   // retrieve user with id
  //   const user = await this.user.findOne({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   if (!user) {
  //     throw new Error("User not found");
  //   }

  //   // Hash new password
  //   const salt = bcrypt.genSaltSync(12);
  //   const hash = bcrypt.hashSync(newPassword, salt);

  //   // Update user password with new hash
  //   await this.user.update(
  //     { password: hash },
  //     {
  //       where: {
  //         id: id,
  //       },
  //     }
  //   );
  //   return user;
  // }
}

module.exports = UserService;
