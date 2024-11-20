import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosClient = axios.create({
  //baseURL: "https://tripytoebackend.onrender.com/",
  baseURL: "https://dev.api.bexcart.com/api/",
});
// Add a request interceptor to set the Authorization header before each request
axiosClient.interceptors.request.use(
  async(config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;