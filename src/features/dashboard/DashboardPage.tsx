import React from "react";
import Sidebar from "./components/Sidebar";
import TopButtons from "./components/TopButtons";
import WelcomeMessage from "./components/WelcomeMessage";
import ResourceTable from "./components/ResourceTable";
import Footer from "./components/Footer";
import { useDashboardData } from "./hooks/useDashboardData";

const DashboardPage: React.FC = () => {
  const { user, resources, loading } = useDashboardData();

  return (
    
    <div className="flex h-full">
      {/* Sidebar izquierdo */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Bienvenida */}
        <WelcomeMessage user={user} />

        {/* Botones horizontales */}
        <TopButtons />

        {/* Tabla */}
        <div className="overflow-x-auto flex-1">
          <ResourceTable resources={resources} loading={loading} />
        </div>

        {/* Footer */}
        <div className="mt-6">
  <Footer />
</div>

      </div>
    </div>
  );
};

export default DashboardPage;
