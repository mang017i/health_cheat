import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

class AuthService {
  register(data) {
    return axios.post(`${API_URL}/auth/register`, data);
  }

  login(data) {
    return axios.post(`${API_URL}/auth/login`, data);
  }
};

const authService = new AuthService();

export default authService;
