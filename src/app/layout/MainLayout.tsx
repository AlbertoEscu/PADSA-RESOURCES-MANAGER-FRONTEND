import { Header } from "./Header";
import { AnimatedOutlet } from "./AnimatedOutlet";


/**
 * Layout autenticado.
 * Contiene:
 * - Sidebar
 * - Header
 * - Área dinámica
 */
export const MainLayout: React.FC = () => {
  return (
<div className="flex h-screen overflow-hidden">

  <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 p-5 bg-transparent overflow-auto">
          <AnimatedOutlet />

        </main>
      </div>
    </div>
  );
};
