import { Loading } from "notiflix";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../Firebase/config";

const ProtectedRouteEmpresa = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    Loading.pulse("Verificando acceso...");
    return null;
  }

  Loading.remove();

  if (!user) {
    return <Navigate to="/auth" />;
  }

  // Si el email termina en @mercadoargentino.com es una empresa válida
  if (!user.email.endsWith("@mercadoargentino.com")) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRouteEmpresa;
