import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "../src/features/auth/context/AuthContext";
import { AppRouter } from "./app/router";
import SessionExpiredModal from "../src/components/SessionExpiredModal";

function App() {
  const originalNavigate = window.history.pushState;

  window.history.pushState = function (...args) {
    return originalNavigate.apply(this, args);
  };
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />

        {/* Global UI */}
        <SessionExpiredModal />
        <Toaster position="top-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
