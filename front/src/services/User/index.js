import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

class UserService {
  getAllUsers() {
    return axios.get(`${API_URL}`);
  }

  getUserById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  updateUserById(id, data) {
    return axios.put(`${API_URL}/update/${id}`, data);
  }

  deleteUserById(id) {
    return axios.delete(`${API_URL}/remove/${id}`);
  }
};

const userService = new UserService();

export default userService;
