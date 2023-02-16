const Role = require("../../models/index")["Role"];
const User = require("../../models/index")["User"];

class RoleService {
  constructor() {
    this.role = Role;
  }

  /**
   * @param {Role} role
   * @returns {Promise<Role>}
   */
  async create(role) {
    return await this.role.create(role);
  }

  /**
   * @returns {Promise<Role[]>}
   */
  async findAll() {
    return await this.role.findAll({
      include: [
        {
          model: User,
          as: "users",
        },
      ],
    }).then((roles) => {
      if (roles) {
        return roles;
      } else {
        throw new Error("No roles found");
      }
    });
  }

  /**
   * @param {Number} id
   * @returns {Promise<Role>}
   */
  async findOne(id) {
    return await this.role
      .findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: User,
            as: "users",
          },
        ],
      })
      .then((role) => {
        if (role) {
          return role;
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  /**
   * @param {Number} id
   * @param {Role} role
   * @returns {Promise<Role>}
   */
  async update(id, role) {
    return await this.role.update(role, {
      where: {
        id: id,
      },
    })
    .then((role) => {
      if (role) {
        return role;
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });

  }

  /**
   * @param {Number} id
   * @returns {Promise<Role>}
   */
  async delete(id) {
    return await this.role.destroy({
      where: {
        id: id,
      },
    })
    .then((num) => {
      if (num == 1) {
        return this.findAll();
      } else {
        throw new Error("Role not found with id: " + id);
      }
    });
  }

  /**
   * @param {String} name
   * @returns {Promise<Role>}
   */
  async findByName(name) {
    return await this.role.findOne({
      where: {
        name: name,
      },
    });
  }

  /** ROLE HELPERS **/

  /**
   * @param {String} name
   * @returns {Boolean}
   * @description Check if role name already exists
   */
  async checkRoleName(name) {
    const roleFound = await this.findByName(name);
    return roleFound ? true : false;
  }
}

module.exports = RoleService;
