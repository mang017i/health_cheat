const Bookmark = require("../../models/index")["Bookmark"];
const BookmarkService = require("../../services/Bookmark");
const { successResponse, errorResponse } = require("../../helpers/index");

class BookmarkController {
  /**
   * @param {User} user_id
   * @param {Cheat} cheat_id
   * @returns {Promise<Bookmark>}
   * @description Add cheat to user
   */
  async addCheatToUser(req, res) {
    try {
      const userId = req.body.user_id;
      const cheatId = req.body.cheat_id;
      const bookmark = await BookmarkService.addCheatToUser(userId, cheatId);
      const message = "Cheat added to user successfully";
      return successResponse(req, res, bookmark, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {User} user_id
   * @param {Cheat} cheat_id
   * @returns {Promise<Bookmark>}
   * @description Removes a Cheat from a user's bookmarks
   */
  async removeCheatFromUser(req, res) {
    try {
      const userId = req.body.user_id;
      const cheatId = req.body.cheat_id;
      const bookmark = await BookmarkService.removeCheatFromUser(
        userId,
        cheatId
      );
      const message = "Cheat removed from user successfully";
      return successResponse(req, res, bookmark, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {User} user_id
   * @returns {Promise<Bookmark[]>}
   * @description Get all bookmarks for a user
   */
  async getAllBookmarksForUser(req, res) {
    try {
      const userId = req.query.user_id;
      const bookmarks = await BookmarkService.findAllByUserId(userId);
      const message = "Bookmarks retrieved successfully";
      return successResponse(req, res, bookmarks, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {Cheat} cheat_id
   * @returns {Promise<Bookmark>}
   * @description Get all bookmarks for a cheat
   */
  async getAllBookmarksForCheat(req, res) {
    try {
      const cheatId = req.query.cheat_id;
      const bookmarks = await BookmarkService.findAllByCheatId(cheatId);
      const message = "Bookmarks retrieved successfully";
      return successResponse(req, res, bookmarks, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {User} user_id
   * @param {Cheat} cheat_id
   * @returns {Promise<Bookmark>}
   * @description Find a bookmark by user and cheat
   */
  async findBookmarkByUserAndCheat(req, res) {
    try {
      const userId = req.query.user_id;
      const cheatId = req.query.cheat_id;
      const bookmark = await BookmarkService.findOneByUserIdAndCheatId(
        userId,
        cheatId
      );
      const message = "Bookmark retrieved successfully";
      return successResponse(req, res, bookmark, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @returns {Promise<Bookmark[]>}
   * @description Get all bookmarks
   */
  async getAllBookmarks(req, res) {
    try {
      const bookmarks = await BookmarkService.findAll();
      const message = "Bookmarks retrieved successfully";
      return successResponse(req, res, bookmarks, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {User} user_id
   * @param {Cheat} cheat_id
   * @returns {Promise<Bookmark>}
   * @description Check if a cheat is bookmarked by a user
   */
  async isCheatBookmarkedByUser(req, res) {
    try {
      const userId = req.query.user_id;
      const cheatId = req.query.cheat_id;
      const bookmark = await BookmarkService.isCheatBookmarked(
        userId,
        cheatId
      );
      if (bookmark === true) {
        const message = "Cheat is bookmarked by user";
        return successResponse(req, res, bookmark, message);
      }
      const message = "Cheat is not bookmarked by any user";
      return successResponse(req, res, bookmark, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }
}

module.exports = new BookmarkController();
