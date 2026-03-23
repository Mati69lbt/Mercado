// cspell: ignore CUIT categoria cuit direccion barrio ciudad duenoNombre duenoCel encargadoNombre encargadoCel productoSorteo fechaSorteo costoServicio usuarioEmpresa passwordEmpresa estaActiva fechaAlta vigencia togglePass formatCurrency anio mes dia diasRestantes fechaVigencia setShowPass showPass expandedRows setExpandedRows toggleRow
import React, { useState } from "react";
import { formatCurrency, togglePass } from "./configCompany";
import { handleDeleteCompany } from "./deleteCompany";

const PcDoubleRowTable = ({ list, onEdit }) => {
  const companies = list || [];
  const [showPass, setShowPass] = useState({});
  const [expandedRows, setExpandedRows] = useState({});
  const [searchCompany, setSearchCompany] = useState("");

  const companiesSorted = [...companies].sort((a, b) =>
    (a.nombreComercio || "")
      .trim()
      .localeCompare((b.nombreComercio || "").trim(), "es", {
        sensitivity: "base",
      }),
  );

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredCompanies = companiesSorted.filter((empresa) =>
    (empresa.nombreComercio || "")
      .toLowerCase()
      .includes(searchCompany.toLowerCase().trim()),
  );

  return (
    <div className="hidden md:block bg-white rounded-2xl shadow-sm  overflow-hidden transition-colors duration-300  ">
      <div className="mb-4 px-2">
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchCompany}
            onChange={(e) => setSearchCompany(e.target.value)}
            placeholder="Buscar empresa por nombre..."
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm text-gray-700 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
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
                strokeWidth={2}
                d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
        </div>
      </div>
      {filteredCompanies.length === 0 && searchCompany.trim() !== "" && (
        <div className="px-2 pb-3">
          <p className="text-sm text-gray-500 italic">
            No se encontraron empresas con ese nombre.
          </p>
        </div>
      )}
      <table className="w-full border-collapse">
        <tbody className="divide-y-12 divide-gray-100">
          {filteredCompanies.map((empresa) => {
            const isExpanded = !!expandedRows[empresa.id];
            return (
              <React.Fragment key={empresa.id}>
                {/* --- BLOQUE FILA 1 --- */}
                <tr
                  className={`text-sm cursor-pointer transition-all duration-200 ${
                    isExpanded
                      ? "bg-indigo-50/30 border-t-4 border-l-4 border-r-4 border-b-2  border-t-indigo-500 border-l-indigo-500 border-r-indigo-500 border-b-gray-400"
                      : "bg-white border-gray-100 hover:bg-gray-50/70"
                  }`}
                  onClick={() => toggleRow(empresa.id)}
                >
                  {/* Col 1 y 2: Empresa */}
                  <td
                    className={`px-4 py-4 font-black uppercase text-[10px] w-[5%] transition-colors ${
                      isExpanded
                        ? "bg-indigo-100 text-indigo-600 rounded-tl-2xl border-t border-l border-indigo-200"
                        : "bg-gray-50/30 text-gray-400"
                    }`}
                  >
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
                  <td className="px-4 py-3 font-black text-gray-400 uppercase text-[10px] bg-gray-50/30 w-[10%] text-right align-top">
                    <div className="flex flex-col gap-1">
                      <span>CUIT:</span>
                      <span>Última modificación:</span>
                    </div>
                  </td>

                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-gray-900">
                        {empresa.cuit ? (
                          empresa.cuit
                        ) : (
                          <span className="text-red-600 font-semibold italic">
                            a completar
                          </span>
                        )}
                      </span>

                      <span className="text-sm text-gray-500">
                        {empresa.ultimaModificacion
                          ?.toDate()
                          ?.toLocaleDateString() || "-"}
                      </span>
                    </div>
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
                          toggleRow(empresa.id);
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

                    <tr
                      className={`text-sm transition-colors ${
                        isExpanded
                          ? "bg-indigo-100/40 border-l-4 border-r-4 border-b-2 border-l-indigo-500 border-r-indigo-500 border-b-gray-400"
                          : "bg-white border-t border-gray-50"
                      }`}
                    >
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

                    <tr
                      className={`text-sm transition-colors ${
                        isExpanded
                          ? "bg-indigo-50/30 border-l-4 border-r-4 border-b-2 border-l-indigo-500 border-r-indigo-500 border-b-gray-400"
                          : "bg-white border-t border-gray-50"
                      }`}
                    >
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
                    {/* "bg-indigo-50/30 border-t-4 border-l-4 border-r-4 border-b-2 border-t-indigo-500 border-l-indigo-500 border-r-indigo-500 border-b-gray-400" */}
                    <tr
                      className={`text-sm transition-colors ${
                        isExpanded
                          ? "bg-indigo-100/40 border-l-4 border-r-4 border-b-4 border-l-indigo-500 border-r-indigo-500 border-b-indigo-500 "
                          : "bg-white border-t border-b-8 border-gray-600"
                      }`}
                    >
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
                            {empresa.fechaAlta?.toDate?.().toLocaleDateString()}
                            )
                          </span>
                        </div>

                        <div
                          className={`text-[11px] font-bold ${(() => {
                            if (!empresa.vigenciaContrato)
                              return "text-gray-400";
                            const [anio, mes, dia] = empresa.vigenciaContrato
                              .split("-")
                              .map(Number);
                            const fechaVigencia = new Date(anio, mes - 1, dia);
                            const hoy = new Date();
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PcDoubleRowTable;
