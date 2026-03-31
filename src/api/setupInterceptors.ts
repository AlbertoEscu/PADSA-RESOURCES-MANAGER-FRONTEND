import { axiosInstance } from "./axiosInstance";

let isInitialized = false;

export const setupInterceptors = (
  logout: (expired?: boolean) => void
) => {

  if (isInitialized) return;

  isInitialized = true;

  axiosInstance.interceptors.request.use(

    (config) => {

      const token = localStorage.getItem("token");

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;

    },

    (error) => Promise.reject(error)
  );


  axiosInstance.interceptors.response.use(

    (response) => response,

    (error) => {

      if (error.response?.status === 401) {

        logout(true); // ✅ marcar como sesión expirada

      }

      return Promise.reject(error);

    }

  );

};