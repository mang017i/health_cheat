import axios from "axios";

const API_URL = "http://localhost:8080/api/bookmarks";

class BookmarkService {
  getAllBookmarks() {
    return axios.get(API_URL);
  }

  getAllBookmarksForUser(userId) {
    try {
    const response = axios.get(API_URL + '/user', {
      params: { user_id: userId },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

  getAllBookmarksForCheat() {
    return axios.get(API_URL + "/cheat");
  }

  findBookmarkByUserAndCheat(userId, cheatId) {
    try {
      const response = axios.get(API_URL + '/user/cheat', {
        params: { user_id: userId,
                  cheat_id: cheatId },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  isCheatBookmarkedByUser() {
    return axios.get(API_URL + "/cheat/bookmarked");
  }

  addCheatToUser(data) {
    return axios.post(API_URL + "/add", data);
  }

  removeBookmarkFromUser(userId, cheatId) {
    try {
      const response = axios.delete(API_URL +'/remove', {
        data: { user_id: userId, cheat_id: cheatId },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

}

const bookmarkService = new BookmarkService();

export default bookmarkService;
