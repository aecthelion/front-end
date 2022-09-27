import axios from "axios";
import { ILogin } from "./authSlice";

const API_URL = "http://localhost:5000/api/auth";

const register = async (userData: any) => {
  const response = await axios.post(`${API_URL}/register`, userData);

  return response.data;
};

const login = async (userData: ILogin) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data) {
    localStorage.setItem("user",  JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;
