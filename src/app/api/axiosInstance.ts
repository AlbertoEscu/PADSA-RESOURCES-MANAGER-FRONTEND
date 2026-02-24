import axios from "axios";

/**
 * Creamos una instancia personalizada de Axios.
 * Esto evita usar axios directamente en cada componente.
 * Permite:
 * - Configuración global
 * - Base URL centralizada
 * - Timeout controlado
 * - Headers comunes
 */

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // Cambiar cuando exista backend real
  timeout: 10000, // 10 segundos máximo
  headers: {
    "Content-Type": "application/json",
  },
});
