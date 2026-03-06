import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../../Firebase/config";
import { handleLogout } from "../utils/configCompany";
import { Link } from "react-router-dom";
import { subscribeToCompanies } from "../utils/getCompanies";

const CompanyManage = () => {
  const [user] = useAuthState(auth);
  const [companies, setCompanies] = useState([]);
  const [showPass, setShowPass] = useState({});
  console.log("Empresas traídas de Firebase:", companies);

  useEffect(() => {
    // Nos suscribimos a los cambios
    const unsubscribe = subscribeToCompanies(setCompanies);

    // Limpiamos la conexión cuando nos vamos de la página
    return () => unsubscribe();
  }, []);

  // Formateador de moneda para el costo de servicio
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(amount || 0);
  };

  const togglePass = (id) => {
    setShowPass((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-800">
            MARG <span className="text-indigo-600">Admin</span>
          </h1>
          <p className="text-sm text-gray-500">Gestión Integral de Empresas</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/createCompany">
            <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
              + Nueva Empresa
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-500 font-bold px-4 hover:bg-red-50 rounded-xl transition-all"
          >
            Salir
          </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest border-b">
                <th className="px-6 py-4">Empresa / CUIT</th>
                <th className="px-6 py-4">Ubicación y Dir.</th>
                <th className="px-6 py-4">Contactos (Dueño/Enc.)</th>
                <th className="px-6 py-4">Sorteo y Costo</th>
                <th className="px-6 py-4">Accesos</th>
                <th className="px-6 py-4">Info</th>

                <th className="px-6 py-4 text-center">Estado</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {companies.map((empresa) => (
                <tr
                  key={empresa.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {/* Empresa y CUIT */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          empresa.logoUrl || "https://via.placeholder.com/40"
                        }
                        className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                      />
                      <div>
                        <p className="font-bold text-gray-800 leading-tight">
                          {empresa.nombreComercio}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          CUIT: {empresa.cuit || "N/A"}
                        </p>
                        <p className="text-[10px] italic text-indigo-500 truncate max-w-[150px]">
                          {empresa.emailEmpresa}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          Categoria: {empresa.categoria || "Sin categoría"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Ubicación y Dirección */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-700">
                      {empresa.direccion}
                    </p>
                    <p className="text-xs text-gray-400">
                      {empresa.barrio}, {empresa.ciudad}
                    </p>
                  </td>

                  {/* Contactos */}
                  <td className="px-6 py-4">
                    <div className="text-[11px] space-y-1">
                      <p>
                        <span className="font-bold text-gray-500">D:</span>{" "}
                        {empresa.duenoNombre} ({empresa.duenoCel})
                      </p>
                      <p>
                        <span className="font-bold text-gray-500">E:</span>{" "}
                        {empresa.encargadoNombre} ({empresa.encargadoCel})
                      </p>
                    </div>
                  </td>

                  {/* Sorteo y Costo */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-indigo-600">
                      {empresa.productoSorteo}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Sortea: 28/03/2026
                    </p>
                    <p className="text-xs font-mono mt-1 text-green-600 font-bold">
                      {formatCurrency(empresa.costoServicio)}
                    </p>
                  </td>

                  {/* Accesos con botón Ver */}
                  <td className="px-6 py-4">
                    <div className="bg-gray-50 p-2 rounded-lg border border-gray-100 min-w-[140px]">
                      <p className="text-[10px] text-gray-400">
                        User:{" "}
                        <span className="text-gray-700 font-medium">
                          {empresa.usuarioEmpresa}
                        </span>
                      </p>
                      <div className="flex items-center justify-between gap-2 mt-1">
                        <p className="text-[10px] text-gray-400 font-mono">
                          Pass:{" "}
                          {showPass[empresa.id]
                            ? empresa.passwordEmpresa
                            : "••••••••"}
                        </p>
                        <button
                          onClick={() => togglePass(empresa.id)}
                          className="text-indigo-500 hover:text-indigo-700"
                        >
                          {showPass[empresa.id] ? (
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span>
                      <p className="text-[12px] text-gray-400 mt-1">
                        {empresa.descripcionCorta || "Sin descripción"}
                      </p>
                    </span>
                  </td>

                  {/* Estado */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-[10px] font-bold ${empresa.estaActiva ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {empresa.estaActiva ? "ACTIVA" : "INACTIVA"}
                    </span>
                    <p className="text-[9px] text-gray-400 mt-1">
                      Alta:{" "}
                      {empresa.fechaAlta?.toDate
                        ? empresa.fechaAlta.toDate().toLocaleDateString()
                        : "N/A"}
                    </p>
                  </td>

                  {/* Acciones (Próximamente) */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompanyManage;
