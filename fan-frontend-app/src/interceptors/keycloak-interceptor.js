import { apiUrl } from "../constants/environment";
import keycloak from "../Keycloak";
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

axiosInstance.interceptors.request.use(
async (config) => {
  const token = keycloak.token;
  if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance