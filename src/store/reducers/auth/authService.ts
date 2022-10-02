import axios from 'axios';
import { ILogin } from './../../../models/IAuth';

const API_URL = 'http://localhost:5000/api/auth';

const registerUser = async (registerData: FormData) => {
  const response = await axios.post(`${API_URL}/register`, registerData);

  return response.data;
};

const loginUser = async (loginData: ILogin) => {
  const response = await axios.post(`${API_URL}/login`, loginData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  registerUser,
  loginUser,
};

export default authService;
