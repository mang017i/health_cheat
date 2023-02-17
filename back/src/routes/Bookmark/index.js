module.exports = (app) => {
  const Bookmark = require("../../controllers/Bookmark");
  const router = require("express").Router();
  // const { authJwt } = require("../../middleware");

  // Retrieve all Bookmarks
  router.get("/",
  // [authJwt.verifyToken, authJwt.isAdmin],
  Bookmark.getAllBookmarks);

  // Retrieve all Bookmarks of a User
  router.get("/user/:id",
  // authJwt.verifyToken,
  Bookmark.getAllBookmarksForUser);

  // Retrieve all Bookmarks of a Cheat
  router.get("/cheat",
  // [authJwt.verifyToken, authJwt.isAdmin],
  Bookmark.getAllBookmarksForCheat);

  // Retrieve a Bookmark by User and Cheat
  router.get("/user/cheat",
  // authJwt.verifyToken,
  Bookmark.findBookmarkByUserAndCheat);

  // Check if a Cheat is Bookmarked by a User
  router.get("/cheat/bookmarked",
  // authJwt.verifyToken,
  Bookmark.isCheatBookmarkedByUser);

  // Add Cryto to User's Bookmarks
  router.post("/add",
  // authJwt.verifyToken,
  Bookmark.addCheatToUser);

  // Remove Cheat from User's Bookmarks
  // Add id ??????????????????
  router.delete("/remove",
  //  authJwt.verifyToken,
  Bookmark.removeCheatFromUser);

  app.use('/api/bookmarks', router);
}
