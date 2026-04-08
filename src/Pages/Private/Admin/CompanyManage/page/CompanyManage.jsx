import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../../Firebase/config";
import { handleLogout } from "../utils/configCompany";
import { Link, useNavigate } from "react-router-dom";
import { subscribeToCompanies } from "../utils/getCompanies";
import PcDoubleRowTable from "../utils/PcDoubleRowTable";
import MobileCardList from "../utils/MobileCardList";
import { Loading } from "notiflix";
import { handleCrearAuth } from "../../CompanyCreate/utils/createUser";

const CompanyManage = () => {
  const [user] = useAuthState(auth);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleEdit = (empresa) => {
    navigate("/admin/editCompany", { state: { empresa } });
  };

  useEffect(() => {
    Loading.standard("Cargando base de datos...");
    const unsubscribe = subscribeToCompanies((data) => {
      setCompanies(data || []);
      setIsLoading(false);
      Loading.remove();
    });
    return () => {
      if (unsubscribe) unsubscribe();
      Loading.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-400 mx-auto flex flex-col md:flex-row justify-between items-center bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 md:mb-8 gap-4">
        {/* Sección de Título e Info */}
        <div className="text-center md:text-left">
          <Link to="/parana">
            <h1 className="text-2xl font-black text-gray-800 tracking-tight">
              MARG <span className="text-indigo-600">Admin</span>
            </h1>
          </Link>
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
            <p className="text-xs md:text-sm text-gray-500 font-medium">
              Gestión Integral de Empresas
            </p>
            <span className="hidden md:inline text-gray-300">|</span>
            <p className="text-[10px] md:text-xs text-indigo-400 font-bold italic truncate max-w-50 md:max-w-none">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Sección de Botones */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-end border-t md:border-t-0 pt-3 md:pt-0">
          <Link to="/admin/createCompany" className="flex-1 md:flex-none">
            <button className="w-full bg-indigo-600 text-white px-4 md:px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all text-sm active:scale-95">
              + <span className="hidden md:inline">Nueva Empresa</span>
              <span className="md:hidden">Nueva</span>
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-500 font-bold px-4 py-2.5 hover:bg-red-50 rounded-xl transition-all text-sm active:scale-95"
          >
            Salir
          </button>
        </div>
      </div>

      {!isLoading &&
        (companies.length === 0 ? (
          <div className="max-w-400 mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
            <p className="text-gray-500 text-lg font-medium">
              No hay empresas registradas.
            </p>
          </div>
        ) : (
          <div className="max-w-400 mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <PcDoubleRowTable
              list={companies}
              onEdit={handleEdit}
              onCrearAuth={handleCrearAuth}
            />
            <MobileCardList
              list={companies}
              onEdit={handleEdit}
              onCrearAuth={handleCrearAuth}
            />
          </div>
        ))}
    </div>
  );
};

export default CompanyManage;
