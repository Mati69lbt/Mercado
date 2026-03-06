import React from "react";
import { Loading } from "notiflix";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../Firebase/config";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);


  if (loading) {
    Loading.pulse("Verificando acceso...");
    return null;
  }

  Loading.remove();

  if (!user) {
    // Si no está logueado, lo mandamos al login (Auth)
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;
