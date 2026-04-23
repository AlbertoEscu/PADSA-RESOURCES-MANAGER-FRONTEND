import { useState } from "react";
import { AuthLayout } from "../../../shared/layout/AuthLayout";
import { authService } from "../services/authService";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await authService.login({
        username,
        password,
      });

      login(response.token, response.nombre, response.rol);
      navigate("/dashboard");
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Usuario o contraseña incorrectos",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-sm text-padsa-text-secondary">Usuario</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="
              w-full mt-1 px-4 py-2
              bg-padsa-surface-light
              border border-padsa-border
              rounded-lg
              text-padsa-text-primary
              focus:outline-none
              focus:border-padsa-primary
            "
          />
        </div>

        <div>
          <label className="text-sm text-padsa-text-secondary">
            Contraseña
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full mt-1 px-4 py-2
              bg-padsa-surface-light
              border border-padsa-border
              rounded-lg
              text-padsa-text-primary
              focus:outline-none
              focus:border-padsa-primary
            "
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
    w-full py-2.5
    bg-padsa-primary
    hover:bg-padsa-primary-dark
    text-white
    rounded-lg
    transition
    glow-padsa
    disabled:opacity-50
  "
        >
          {loading ? "Ingresando..." : "Iniciar sesión"}
        </button>
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </form>
    </AuthLayout>
  );
};
