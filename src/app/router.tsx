import { LoginPage } from '../features/auth/pages/LoginPage';
import { ProtectedRoute } from './ProtectedRoute';
import { MainLayout } from "./layout/MainLayout";
import { AppLayout } from "./layout/AppLayout";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../features/dashboard/DashboardPage"; // importa tu dashboard
import PersonalPage from "../features/personal/pages/PersonalPage";


export const AppRouter = () => {
  return (
    <Routes>

      {/* Layout global con fondo */}
      <Route element={<AppLayout />}>

        {/* Ruta pública */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/personal" element={<PersonalPage />} />

        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Route>

    </Routes>
  );
};