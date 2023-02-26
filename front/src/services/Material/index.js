import axios from "axios";

const API_URL = "http://localhost:8080/api/materials";


class MaterialService {
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
}

const materialService = new MaterialService();

export default materialService;