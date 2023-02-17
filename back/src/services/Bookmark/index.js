const Bookmark = require("../../models/index")["Bookmark"];

class BookmarkService {
  constructor() {
    this.bookmark = Bookmark;
  }

  async addCheatToUser(userId, cheatId) {
    return await this.bookmark
      .create({
        user_id: userId,
        cheat_id: cheatId,
      })
      .then((bookmark) => {
        if (bookmark) {
          return bookmark;
        } else {
          throw new Error(
            `Bookmark not created with user_id: ${userId} and cheat_id: ${cheatId}`
          );
        }
      });
  }

  async removeCheatFromUser(userId, cheatId) {
    return await this.bookmark
      .destroy({
        where: {
          user_id: userId,
          cheat_id: cheatId,
        },
      })
      .then((bookmark) => {
        if (bookmark) {
          return true;
        } else {
          throw new Error(
            `Bookmark not found with user_id: ${userId} and cheat_id: ${cheatId}`
          );
        }
      });
  }

  async findAllByUserId(userId) {
    return await this.bookmark
      .findAll({
        where: {
          user_id: userId,
        },
      })
      .then((bookmarks) => {
        if (bookmarks.length === 0) {
          throw new Error(`Any bookmarks found with user_id: ${userId}`);
        }
        return bookmarks;
      });
  }

  async findAllByCheatId(cheatId) {
    return await this.bookmark
      .findAll({
        where: {
          cheat_id: cheatId,
        },
      })
      .then((bookmarks) => {
        if (bookmarks.length === 0) {
          throw new Error(`Any bookmarks found with cheat_id: ${cheatId}`);
        }
        return bookmarks;
      });
  }

  async findOneByUserIdAndCheatId(userId, cheatId) {
    return await this.bookmark
      .findOne({
        where: {
          user_id: userId,
          cheat_id: cheatId,
        },
      })
      .then((bookmark) => {
        if (bookmark) {
          return bookmark;
        } else {
          throw new Error(
            `Bookmark not found with user_id: ${userId} and cheat_id: ${cheatId}`
          );
        }
      });
  }

  async findAll() {
    return await this.bookmark.findAll().then((bookmarks) => {
      if (bookmarks) {
        if (bookmarks.length === 0) {
            throw new Error("Any bookmarks found");
        }
        return bookmarks;
      } else {
        throw new Error("Any bookmarks found");
      }
    });
  }

  /** BOOKMARKS HELPERS */
  async isCheatBookmarked(userId, cheatId) {
    return await this.findOneByUserIdAndCheatId(userId, cheatId)
      .then((bookmark) => {
        if (bookmark) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        return false;
      });
  }
}

module.exports = new BookmarkService();
