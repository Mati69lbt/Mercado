// cspell: ignore CUIT categoria cuit direccion barrio ciudad duenoNombre duenoCel encargadoNombre encargadoCel productoSorteo fechaSorteo costoServicio usuarioEmpresa passwordEmpresa estaActiva fechaAlta vigencia togglePass formatCurrency anio mes dia diasRestantes fechaVigencia setShowPass showPass expandedRows setExpandedRows toggleRow
import React, { useState } from "react";
import { formatCurrency, togglePass } from "./configCompany";
import { handleDeleteCompany } from "./deleteCompany";


const PcDoubleRowTable = ({ list, onEdit }) => {
  const companies = list || [];
  const [showPass, setShowPass] = useState({});
  const [expandedRows, setExpandedRows] = useState({});



  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full border-collapse">
        <tbody className="divide-y-8 divide-gray-100">
          {companies.map((empresa) => (
            <React.Fragment key={empresa.id}>
              {/* --- BLOQUE FILA 1 --- */}
              <tr
                className="bg-white text-sm border-t border-gray-50"
                onClick={() => toggleRow(empresa.id)}
                style={{ cursor: "pointer" }}
              >
                {/* Col 1 y 2: Empresa */}
                <td className="px-4 py-3 font-black text-gray-400 uppercase text-[10px] bg-gray-50/30 w-[5%]">
                  Empresa:
                </td>
                <td className="px-4 py-3 w-[18%] ">
                  <div className="flex items-center gap-2">
                    <img
                      src={empresa.logoUrl}
                      className="w-8 h-8 rounded object-cover"
                      alt="logo"
                    />
                    <span className="font-bold text-indigo-600">
                      {empresa.nombreComercio}
                    </span>
                  </div>
                </td>
                {/* Col 3 y 4: CUIT */}
                <td className="px-4 py-3 font-black text-gray-400 uppercase text-[10px] bg-gray-50/30 w-[10%] text-right">
                  CUIT:
                </td>
                <td className="px-4 py-3 w-[15%] font-medium ">
                  {empresa.cuit}
                </td>
                {/* Col 5 y 6: Email */}
                <td className="px-4 py-3 font-black text-gray-400 uppercase text-[10px] bg-gray-50/30 w-[8%] text-right">
                  Email:
                </td>
                <td className="px-4 py-3 w-[30%] font-medium">
                  <div className="flex items-center justify-between w-full">
                    {/* El texto del mail se queda a la izquierda */}
                    <span className="truncate pr-2">
                      {empresa.emailEmpresa}
                    </span>

                    {/* El botón se desplaza al extremo derecho */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRow(empresa);
                      }}
                      className={`shrink-0 p-1.5 rounded-lg bg-gray-50 text-indigo-500 hover:bg-indigo-50 transition-all duration-300 ${
                        expandedRows[empresa.id]
                          ? "rotate-180 bg-indigo-50"
                          : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              {expandedRows[empresa.id] && (
                <>
                  {/* --- BLOQUE FILA 2 --- */}
                  <tr className="bg-white text-sm border-t border-gray-50">
                    <td className="px-4 py-3 font-black text-gray-400 uppercase text-[10px] bg-gray-50/30">
                      Categoría:
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {empresa.categoria
                        ? empresa.categoria
                        : "Sin Especificar"}
                    </td>
                    <td className="px-4 py-3 font-black text-gray-400 uppercase text-[12px] bg-gray-50/30 leading-relaxed text-right">
                      Dirección:
                      <br />
                      Barrio:
                    </td>
                    <td className="px-4 py-3 font-medium leading-relaxed">
                      <div className="text-gray-800">{empresa.direccion}</div>
                      <div className="text-gray-500 text-xs">
                        {empresa.barrio}, {empresa.ciudad}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-black text-gray-400 uppercase text-[12px] bg-gray-50/30 leading-relaxed text-right">
                      Dueño:
                      <br />
                      Encargado:
                    </td>
                    <td className="px-4 py-3 font-medium leading-relaxed">
                      <div className="text-gray-800">
                        {empresa.duenoNombre ? (
                          <>
                            {empresa.duenoNombre}{" "}
                            <span className="text-indigo-500 font-bold text-[10px]">
                              ({empresa.duenoCel})
                            </span>
                          </>
                        ) : (
                          "No asignado"
                        )}
                      </div>
                      <div className="text-gray-800">
                        {empresa.encargadoNombre ? (
                          <>
                            {empresa.encargadoNombre}{" "}
                            <span className="text-indigo-500 font-bold text-[10px]">
                              ({empresa.encargadoCel})
                            </span>
                          </>
                        ) : (
                          "No asignado"
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* --- BLOQUE FILA 3 --- */}
                  <tr className="bg-white text-sm border-t border-gray-50">
                    <td className="px-4 py-3 font-black text-gray-400 uppercase text-[10px] bg-gray-50/30">
                      Sorteo:
                    </td>
                    <td className="px-4 py-3 font-bold text-indigo-600 italic">
                      {empresa.productoSorteo}
                    </td>
                    <td className="px-4 py-3 font-black text-gray-400 uppercase text-[10px] bg-gray-50/30 text-right">
                      Fecha del sorteo:
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {empresa.fechaSorteo
                        ? empresa.fechaSorteo.split("-").reverse().join("-")
                        : "Sin fecha"}
                    </td>
                    <td className="px-4 py-3 font-black text-gray-400 uppercase text-[10px] bg-gray-50/30 text-right">
                      Costo:
                    </td>
                    <td className="px-4 py-3 font-black text-green-600">
                      {formatCurrency(empresa.costoServicio)}
                    </td>
                  </tr>

                  {/* --- BLOQUE FILA 4: Accesos y Acciones --- */}
                  <tr className="bg-white text-sm border-t border-gray-600 border-b-8 ">
                    <td className="px-4 py-3 font-black text-gray-400 uppercase text-[10px] bg-gray-100/30">
                      Usuario: <br />
                      Pass:
                    </td>
                    <td className="px-4 py-3 font-medium">
                      <div>{empresa.usuarioEmpresa}</div>
                      <div>
                        {showPass[empresa.id]
                          ? empresa.passwordEmpresa
                          : "••••••••"}
                        <button
                          onClick={() => togglePass(empresa.id, setShowPass)}
                          className="ml-2 text-indigo-400"
                        >
                          👁
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-black text-gray-400 uppercase text-[11px] bg-gray-100/30 text-right">
                      Estado: <br />
                      Vigencia hasta:
                    </td>
                    <td className="px-4 py-3 font-medium leading-relaxed">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-black uppercase text-[12px] ${empresa.estaActiva ? "text-green-500" : "text-red-400"}`}
                        >
                          {empresa.estaActiva ? "ACTIVA" : "INACTIVA"}
                        </span>
                        <span className="text-[9px] text-gray-400 italic">
                          (Alta:{" "}
                          {empresa.fechaAlta?.toDate?.().toLocaleDateString()})
                        </span>
                      </div>

                      <div
                        className={`text-[11px] font-bold ${(() => {
                          // 1. Validar que exista el dato correcto
                          if (!empresa.vigenciaContrato) return "text-gray-400";

                          // 2. IMPORTANTE: El split debe ser por "-"
                          // Como viene YYYY-MM-DD, el orden es [año, mes, día]
                          const [anio, mes, dia] = empresa.vigenciaContrato
                            .split("-")
                            .map(Number);

                          // 3. Crear el objeto de fecha (el mes en JS va de 0 a 11, por eso mes - 1)
                          const fechaVigencia = new Date(anio, mes - 1, dia);
                          const hoy = new Date();

                          // 4. Calcular diferencia en días
                          const diferenciaMilisegundos = fechaVigencia - hoy;
                          const diasRestantes = Math.ceil(
                            diferenciaMilisegundos / (1000 * 60 * 60 * 24),
                          );

                          return diasRestantes <= 15
                            ? "text-red-500"
                            : "text-green-500";
                        })()}`}
                      >
                        {empresa.estaActiva
                          ? empresa.vigenciaContrato
                            ? empresa.vigenciaContrato
                                .split("-")
                                .reverse()
                                .join("-") // Muestra "29-06-2026"
                            : "Sin especificar vigencia"
                          : "Requiere Activación"}
                      </div>
                    </td>
                    <td
                      className="px-4 py-3 font-black text-gray-400 uppercase text-[10px] bg-gray-100/30 text-right"
                      colSpan="1"
                    >
                      Acciones:
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-evenly gap-2">
                        {/* SVG EDITAR ORIGINAL */}
                        <button
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(empresa, { title: "Editar" });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
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
                        {/* SVG ELIMINAR ORIGINAL */}
                        <button
                          className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCompany(
                              empresa.id,
                              empresa.nombreComercio,
                            );
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
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
                </>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PcDoubleRowTable;
