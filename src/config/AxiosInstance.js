import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BE_URL,
});

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      window.location.href = "/";
      localStorage.clear();
      console.log('Unauthorized User');
    }
    return Promise.reject(error)
  }
);

export default axiosInstance;
