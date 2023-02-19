import axios from "axios";

const API_URL = "http://localhost:8080/api/bookmarks";

class BookmarkService {
  getAllBookmarks() {
    return axios.get(API_URL);
  }

  getAllBookmarksForUser(userId) {
    return axios.get(API_URL + `/user/${userId}`);
  }

  getAllBookmarksForCheat() {
    return axios.get(API_URL + "/cheat");
  }

  findBookmarkByUserAndCheat() {
    return axios.get(API_URL + "/user/cheat");
  }

  isCheatBookmarkedByUser() {
    return axios.get(API_URL + "/cheat/bookmarked");
  }

  addCheatToUser(data) {
    return axios.post(API_URL + "/add", data);
  }

  removeCheatFromUser(data) {
    return axios.delete(API_URL + "/remove", { data: data });
  }
}

const bookmarkService = new BookmarkService();

export default bookmarkService();
