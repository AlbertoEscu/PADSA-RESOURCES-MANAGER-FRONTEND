// 🔐 Login request
export interface LoginRequest {
  username: string;
  password: string;
}

// 🔐 Login response REAL del backend
export interface LoginResponse {
  token: string;
  nombre: string;
  rol: string;
}

// 👤 Usuario en frontend (estado de sesión)
export interface User {
  username: string;
  nombre: string;
  rol: string;
}