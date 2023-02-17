const Category = require("../../models/index")["Category"];
const CategoryService = require("../../services/Category");
const Categories = new CategoryService();
const { successResponse, errorResponse } = require("../../helpers/index");


class CategoryController {

  /**
   * @param {Category} category
   * @returns {Promise<Category>}
   */
  async create(req, res) {
    try {
      const category = await Categories.create(req.body);
      const message = "Category created successfully";
      return successResponse(req, res, category, message);
    }
    catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @returns {Promise<Category[]>}
   */
  async findAll(req, res) {
    try {
      const categories = await Categories.findAll();
      const message = "Categories retrieved successfully";
      return successResponse(req, res, categories, message);
    }
    catch (error) {
      return errorResponse(req, res, error.message);
    }

  }

  /**
   * @param {Number} id
   * @returns {Promise<Category>}
   */
  async findOne(req, res) {
    try {
      const categoryId = req.params.id;
      const category = await Categories.findOne(categoryId);
      const message = "Category retrieved successfully";
      return successResponse(req, res, category, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {Number} id
   * @param {Category} category
   * @returns {Promise<Category>}
   */
  async update(req, res) {
    try {
      const categoryId = req.params.id;
      const category = await Categories.update(categoryId, req.body);
      const message = "Category updated successfully";
      return successResponse(req, res, category, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {Number} id
   * @returns {Promise<Category>}
   */
  async delete(req, res) {
    try {
      const categoryId = req.params.id;
      const category = await Categories.delete(categoryId);
      const message = "Category deleted successfully";
      return successResponse(req, res, category, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }
}

module.exports = CategoryController;
