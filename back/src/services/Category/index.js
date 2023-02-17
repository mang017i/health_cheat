const Category = require("../../models/index")["Category"];
const Cheat = require("../../models/index")["Cheat"];

class CategoryService {
  constructor() {
    this.category = Category;
  }

  /**
   * @param {Category} category
   * @returns {Promise<Category>}
   */
  async create(category) {
    return await this.category.create(category);
  }

  /**
   * @returns {Promise<Category[]>}
   */
  async findAll() {
    return await this.category.findAll({
      include: [
        {
          model: Cheat,
          as: "cheats",
        },
      ],
    }).then((categories) => {
      if (categories) {
        return categories;
      } else {
        throw new Error("No categories found");
      }
    });
  }

  /**
   * @param {Number} id
   * @returns {Promise<Category>}
   */
  async findOne(id) {
    return await this.category
      .findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: Cheat,
            as: "cheats",
          },
        ],
      })
      .then((category) => {
        if (category) {
          return category;
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  /**
   * @param {Number} id
   * @param {Category} category
   * @returns {Promise<Category>}
   */
  async update(id, category) {
    return await this.category.update(category, {
      where: {
        id: id,
      },
    })
    .then((category) => {
      if (category) {
        return category;
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });

  }

  /**
   * @param {Number} id
   * @returns {Promise<Category>}
   */
  async delete(id) {
    return await this.category.destroy({
      where: {
        id: id,
      },
    })
    .then((num) => {
      if (num == 1) {
        return this.findAll();
      } else {
        throw new Error("Category not found with id: " + id);
      }
    });
  }

  /**
   * @param {String} name
   * @returns {Promise<Category>}
   */
  async findByName(name) {
    return await this.category.findOne({
      where: {
        name: name,
      },
    });
  }

  /** Category HELPERS **/

  /**
   * @param {String} name
   * @returns {Boolean}
   * @description Check if Category name already exists
   */
  async checkCategoryName(name) {
    const categoryFound = await this.findByName(name);
    return categoryFound ? true : false;
  }
}

module.exports = CategoryService;
