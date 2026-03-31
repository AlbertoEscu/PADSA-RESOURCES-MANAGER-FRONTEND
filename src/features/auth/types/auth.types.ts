// Representa al usuario que viene del backend
export interface User {
  id: number        // Identificador único del usuario
  username: string  // Nombre de usuario
  name: string
  role: string      // Rol (por ahora solo USER)
}

// Lo que enviamos al backend cuando hacemos login
export interface LoginRequest {
  username: string
  password: string
}

// Lo que el backend nos devuelve al autenticarnos correctamente
export interface LoginResponse {
  token: string     // JWT o token generado
  user: User        // Información del usuario autenticado
}
