import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.danbicorp.com",
});

export default axiosInstance;
