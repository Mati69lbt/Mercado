import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../../Firebase/config";
import { getRandomBanner } from "../../../../Public/Empresas/util/bannerColors";
import { useNavigate } from "react-router-dom";
import { Loading } from "notiflix";
import { getEmpresaByUsuario } from "../../../../Public/Empresas/util/Utils";
import { signOut } from "firebase/auth";
import Banner from "../../CreateServices/Utils/Banner";

const EmpresaDashboard = () => {
  const [user] = useAuthState(auth);
  const [empresa, setEmpresa] = useState(null);
  const [banner] = useState(getRandomBanner);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const fetchEmpresa = async () => {
      Loading.standard("Cargando tu empresa...");
      const usuarioEmpresa = user.email.split("@")[0];
      const data = await getEmpresaByUsuario(usuarioEmpresa);
      setEmpresa(data);
      Loading.remove();
    };
    fetchEmpresa();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/auth");
  };

  if (!empresa) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* BANNER — igual que EmpresaInfo */}
      <Banner
        empresa={empresa}
        banner={banner}
        buttonText="Salir"
        onButtonClick={handleLogout}
      />

      {/* CONTENIDO */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
            Mi panel
          </span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* BOTONES PRINCIPALES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <button className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-5 hover:border-indigo-200 hover:shadow-sm transition-all text-left">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6366f1"
                strokeWidth="2"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Mis productos
              </p>
              <p className="text-xs text-gray-400">
                Cargá y gestioná tus productos
              </p>
            </div>
          </button>

          <button
            className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-5 hover:border-indigo-200 hover:shadow-sm transition-all text-left"
            onClick={() => navigate("/empresa/dashboard/nuevo-servicio")}
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6366f1"
                strokeWidth="2"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Mis servicios
              </p>
              <p className="text-xs text-gray-400">
                Cargá y gestioná tus servicios
              </p>
            </div>
          </button>
        </div>

        {/* PLACEHOLDER — acá irán productos/servicios */}
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-10 text-center">
          <p className="text-base font-semibold text-gray-700 mb-1">
            Todavía no publicaste nada
          </p>
          <p className="text-sm text-gray-400">
            Usá los botones de arriba para empezar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmpresaDashboard;
