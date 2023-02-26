const Material = require("../../models/index")["Material"];
const Category = require("../../models/index")["Category"];
const dotenv = require("dotenv");

dotenv.config();


class MaterialService {
  constructor() {
    this.material = Material;
  }

  /**
   * @param {Material} Material
   * @returns {Promise<Material>}
   * @description Create Material in db
   */
  async create(material) {
    return await this.material.create(material);
  }

  /**
   * @returns {Promise<Material[]>}
   * @description Return all Materials
   */
  async findAll() {
    return await this.material
      .findAll({
        // include: [
          // {
          //   model: Category,
          //   as: "categories",
          // },
        // ],
      })
      .then((materials) => {
        if (materials.length !== 0) {
          return materials;
        } else {
          throw new Error("No materials found");
        }
      });
  }

  /**
   * @param {Number} id
   * @returns {Promise<Material>}
   */
  async findOne(id) {
    return await this.material
      .findOne({
        where: {
          id: id,
        },
        // include: [
        //   {
        //     model: Category,
        //     as: "categories",
        //   },
        // ],
      })
      .then((material) => {
        if (material) {
          return material;
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }


  /**
   * @param {Number} id
   * @param {Material} Material
   * @returns {Promise<Material>}
   */
  async update(id, material) {
    return await this.material
      .update(material, {
        where: {
          id: id,
        },
      })
      .then((material) => {
        if (material) {
          return material;
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  /**
   * @param {Number} id
   * @returns {Promise<Material>}
   */
  async delete(id) {
    return await this.material
      .destroy({
        where: {
          id: id,
        },
      })
      .then((num) => {
        if (num == 1) {
          return this.findAll();
        }
      })
      .catch(() => {
        throw new Error("Material not found with id " + id);
      });
  }
}

module.exports = MaterialService;
