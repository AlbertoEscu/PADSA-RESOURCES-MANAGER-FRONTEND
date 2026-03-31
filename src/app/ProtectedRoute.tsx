import { Navigate } from "react-router-dom";

import { useAuth } from "../features/auth/context/useAuth";


interface Props {
  children: React.ReactNode;
}


export const ProtectedRoute = ({ children }: Props) => {

  const {
    token,
    loading
  } = useAuth();


  if (loading)
    return null;


  if (!token)
    return <Navigate to="/login" replace />;


  return <>{children}</>;

};
