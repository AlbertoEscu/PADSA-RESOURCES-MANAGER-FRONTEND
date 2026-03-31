import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export const MainLayout = () => {
  const location = useLocation();

  return (
    <div
      className="
      flex
      h-screen
      bg-padsa-background
      text-padsa-text-primary
      overflow-hidden
    "
    >
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <Header />

        <main
          className="
          flex-1
          overflow-auto
          p-6
          animate-in fade-in duration-300
        "
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
