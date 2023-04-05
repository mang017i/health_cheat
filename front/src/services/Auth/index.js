import axios from "axios";

const API_URL = "http://localhost:8000/api/auth";

class AuthService {
  register(data) {
    return axios.post(`${API_URL}/register`, data);
  }

  login(data) {
    return axios.post(`${API_URL}/login`, data);
  }
};

const authService = new AuthService();

export default authService;
