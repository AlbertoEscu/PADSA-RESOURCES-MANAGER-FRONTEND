import { useContext } from 'react'
import { AuthContext } from './AuthContext'

// Hook personalizado para usar el contexto más fácil
export const useAuth = () => {

  const context = useContext(AuthContext)

  // Si alguien usa este hook fuera del Provider, lanzamos error
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
