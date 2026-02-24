import { Navigate } from 'react-router-dom'
import { useAuth } from '../features/auth/context/useAuth'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isInitializing } = useAuth()

  // 🔥 Mientras se está inicializando, no renderizamos nada
  if (isInitializing) {
    return <div>Cargando...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
