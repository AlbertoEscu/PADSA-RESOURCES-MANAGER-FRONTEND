import { Routes, Route, Navigate } from "react-router-dom";

import { LoginPage } from "../features/auth/pages/LoginPage";

import { DashboardPage } from "../features/dashboard/pages/DashboardPage";
import { PersonalPage } from "../features/personal/pages/PersonalPage";
import { ClientsPage } from "../features/clients/pages/ClientsPage";
import { ProjectsPage } from "../features/projects/pages/ProjectsPage";

import { MainLayout } from "../shared/layout/MainLayout";
import { ProtectedRoute } from "./ProtectedRoute";

import { useAuth } from "../features/auth/context/useAuth";

import { CompanyDetailsPage } from "../features/company-details/pages/CompanyDetailsPage";
import { EditCompanyPage } from "../features/company-details/pages/EditCompanyPage";

import { HorasMesRecursoPage } from "../features/hours/pages/HorasMesRecursoPage";
import { EditHoursPage } from "../features/hours/pages/EditHoursPage";

import { PaymentsPage } from "../features/payments/pages/PaymentsPage";
import { EditPaymentPage } from "../features/payments/pages/EditPaymentPage";

import { TarifaRecursoPage } from "../features/recource-rate/pages/TarifaRecursoPage";
import { EditTarifaRecursoPage } from "../features/recource-rate/pages/EditTarifaRecursoPage";

import { GenerarReportesPage } from "../features/reports/pages/GenerarReportesPage";

import { PersonalProjectPage } from "../features/personal/pages/PersonalProjectPage";

import { AltaPersonalPage } from "../features/personal/pages/AltaPersonalPage";
import { AltaPersonalProjectPage } from "../features/personal/pages/AltaPersonalProjectPage";

import { PersonalWizardLayout } from "../features/personal/components/PersonalWizardLayout";
import { PersonalModuleLayout } from "../features/personal/components/PersonalModuleLayout";
import { PersonalWizardProvider } from "../features/personal/components/PersonalWizardContext";
import { EditClientPage } from "../features/clients/pages/EditClientPage";
import { EditProjectPage } from "../features/projects/pages/EditProjectPage";

import { PerfilPage } from "../features/perfiles/pages/PerfilPage";
import { PerfilFormPage } from "../features/perfiles/pages/PerfilFormPage";

export const AppRouter = () => {
  const { token } = useAuth();

  return (
    <Routes>
      {/* LOGIN */}
      <Route
        path="/login"
        element={token ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />

      {/* APP PROTEGIDA */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* DASHBOARD */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* COMPANIES */}
        <Route path="/companies" element={<CompanyDetailsPage />} />
        <Route path="/companies/new" element={<EditCompanyPage />} />
        <Route path="/companies/edit/:id" element={<EditCompanyPage />} />

        {/* HOURS */}
        <Route path="/hours" element={<HorasMesRecursoPage />} />
        <Route path="/hours/new" element={<EditHoursPage />} />
        <Route path="/hours/edit/:id" element={<EditHoursPage />} />

        {/* PAYMENTS */}
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/payments/new" element={<EditPaymentPage />} />
        <Route path="/payments/edit/:id" element={<EditPaymentPage />} />

        {/* RATES */}
        <Route path="/rates" element={<TarifaRecursoPage />} />
        <Route path="/rates/new" element={<EditTarifaRecursoPage />} />
        <Route path="/rates/edit/:id" element={<EditTarifaRecursoPage />} />

        {/* REPORTS */}
        <Route path="/reports" element={<GenerarReportesPage />} />

        {/* Clients */}
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="clients/new" element={<EditClientPage />} />
        <Route path="clients/edit/:id" element={<EditClientPage />} />

        {/* ===================== PERFILES ===================== */}
        <Route path="/perfiles" element={<PerfilPage />} />
        <Route path="/perfiles/new" element={<PerfilFormPage />} />
        <Route path="/perfiles/edit/:id" element={<PerfilFormPage />} />

        {/* Projects */}
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/new" element={<EditProjectPage />} />
        <Route path="/projects/edit/:id" element={<EditProjectPage />} />

        {/* 🔥 PERSONAL MODULE */}
        <Route
          path="/personal/*"
          element={
            <PersonalWizardProvider>
              <PersonalModuleLayout />
            </PersonalWizardProvider>
          }
        >
          {/* LISTADO PRINCIPAL */}
          <Route index element={<PersonalPage />} />
          <Route path="projects" element={<PersonalProjectPage />} />

          {/* 🧙 WIZARD CREATE */}
          <Route path="new/*" element={<PersonalWizardLayout />}>
            <Route index element={<AltaPersonalPage />} />
            <Route path="project" element={<AltaPersonalProjectPage />} />
          </Route>

          {/* ✏️ WIZARD EDIT */}
          <Route path="edit/:id/*" element={<PersonalWizardLayout />}>
            <Route index element={<AltaPersonalPage />} />
            <Route path="project" element={<AltaPersonalProjectPage />} />
          </Route>
        </Route>
      </Route>

      {/* FALLBACK */}
      <Route
        path="*"
        element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
};
