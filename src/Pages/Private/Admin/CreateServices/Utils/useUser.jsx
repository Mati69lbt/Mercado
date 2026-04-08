import { useEffect, useState } from "react";
import { auth } from "../../../../../Firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getEmpresaByUsuario } from "../../../../Public/Empresas/util/Utils";

export const useUser = () => {
  const [user] = useAuthState(auth);
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const fetchEmpresa = async () => {
      try {
        const usuarioEmpresa = user.email.split("@")[0];
        const data = await getEmpresaByUsuario(usuarioEmpresa);
        setEmpresa(data);
      } finally {
        setLoading(false);
      }
    };
    fetchEmpresa();
  }, [user]);

  return { empresa, loading, user };
};
