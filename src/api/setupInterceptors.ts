import { axiosInstance } from "./axiosInstance";

let isInitialized = false;

export const setupInterceptors = (
  logout: (expired?: boolean) => void
) => {
  if (isInitialized) return;

  isInitialized = true;

  // 🔐 REQUEST INTERCEPTOR
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // 🔁 RESPONSE INTERCEPTOR
  axiosInstance.interceptors.response.use(
    (response) => response,

    (error) => {
      const status = error?.response?.status;

      // 🔴 Token inválido o expirado
      if (status === 401) {
        logout(true);
      }

      // 🔴 Opcional: forbidden (rol insuficiente)
      if (status === 403) {
        console.warn("Acceso denegado - rol insuficiente");
      }

      return Promise.reject(error);
    }
  );
};