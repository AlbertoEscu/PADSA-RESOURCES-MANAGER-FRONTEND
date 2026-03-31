import { axiosInstance } from "./axiosInstance";

/**
 * Configura interceptores globales.
 * Recibe logout como parámetro porque este archivo
 * no puede usar hooks de React.
 */
export const setupInterceptors = (logout: () => void) => {

  /**
   * REQUEST INTERCEPTOR
   * Se ejecuta antes de cada petición.
   * Aquí inyectamos el token automáticamente.
   */
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token) {
        // Agregamos token en header Authorization
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  /**
   * RESPONSE INTERCEPTOR
   * Se ejecuta cuando el backend responde.
   * Aquí manejamos errores globales.
   */
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        /**
         * Si el backend dice "Unauthorized",
         * cerramos sesión automáticamente.
         */
        logout();
      }

      return Promise.reject(error);
    }
  );
};
