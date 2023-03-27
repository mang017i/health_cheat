import axios from "axios";

const API_URL = "http://localhost:8080/api/cheats";
const API_PICTURE = "http://localhost:8080/api/pictures";

class CheatService {
  create(data) {
    return axios.post(API_URL + "/add", data);
  }

  findAll() {
    return axios.get(API_URL);
  }

  findOne(id) {
    return axios.get(API_URL + `/${id}`);
  }

  update(id, data) {
    return axios.put(API_URL + `/update/${id}`, data);
  }

  delete(id) {
    return axios.delete(API_URL + `/remove/${id}`);
  }
  uploadFile(formData) {
    return axios.post(API_PICTURE + "/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  getPictureByCheatId(id) {
    return axios.get(API_PICTURE + `/cheat/${id}`);
  }
}

const cheatService = new CheatService();

export default cheatService;
