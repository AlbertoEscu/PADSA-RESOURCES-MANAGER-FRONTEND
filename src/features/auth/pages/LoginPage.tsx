import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { useEffect } from 'react'

export const LoginPage = () => {
  // Estados para guardar lo que el usuario escribe
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Obtenemos login, loading y error del contexto
  const { login, loading, error, user } = useAuth()

  // Hook para navegar entre rutas
  const navigate = useNavigate()
  // 🔥 Si el usuario ya está autenticado, lo mandamos al dashboard

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await login(username, password)
  }

  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });


  // 🔥 Si el usuario ya está autenticado, lo mandamos al dashboard

  return (
   <div className="min-h-screen flex items-center justify-center">

      <div
        className="
    w-full max-w-md
    bg-white/90
    backdrop-blur-lg
    rounded-2xl
    shadow-2xl
    p-10
    animate-fadeIn
  "
      >

        {/* Título */}
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Sistema de Gestión de Recursos
        </h1>

        {/* Espacio Logo */}
        <div className="flex justify-center mb-8">
          <div className="
          w-20 h-20
          rounded-full
          bg-blue-100
          flex
          items-center
          justify-center
          text-blue-700
          font-semibold
          text-sm
        ">
            LOGO
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Usuario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouched({ ...touched, username: true })}
              className={`
    w-full px-4 py-2 border rounded-lg transition
    focus:outline-none focus:ring-2
    ${touched.username && !username
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-700"
                }
  `}
              required
            />
            {touched.username && !username && (
              <p className="text-red-500 text-xs mt-1">
                El usuario es obligatorio
              </p>
            )}


          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched({ ...touched, password: true })}
              className={`
    w-full px-4 py-2 border rounded-lg transition
    focus:outline-none focus:ring-2
    ${touched.password && !password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-700"
                }
  `}
              required
            />
            {touched.password && !password && (
              <p className="text-red-500 text-xs mt-1">
                La contraseña es obligatoria
              </p>
            )}

          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-100 text-red-700 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="
    w-full
    bg-blue-900
    text-white
    py-2.5
    rounded-lg
    font-semibold
    flex
    items-center
    justify-center
    gap-2
    hover:bg-blue-950
    transition
    duration-200
    shadow-md
    disabled:opacity-60
    disabled:cursor-not-allowed
  "
          >
            {loading && (
              <div className="
      w-4 h-4
      border-2
      border-white
      border-t-transparent
      rounded-full
      animate-spin
    " />
            )}
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>


        </form>
      </div>
    </div>
  )
}