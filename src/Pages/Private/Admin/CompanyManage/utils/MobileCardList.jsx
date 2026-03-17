// cspell: ignore CUIT categoria cuit direccion barrio ciudad duenoNombre duenoCel encargadoNombre encargadoCel productoSorteo fechaSorteo costoServicio usuarioEmpresa passwordEmpresa estaActiva fechaAlta vigenciaContrato anio mes dia fechaVigencia hoy diasRestantes
import React, { useState } from "react";
import { formatCurrency, togglePass } from "./configCompany";
import { handleDeleteCompany } from "./deleteCompany";

const MobileCardList = ({ list, onEdit }) => {
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
    <div className="block md:hidden space-y-4">
      {companies.map((empresa) => (
        <div
          key={empresa.id}
          className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 space-y-1"
        >
          {/* HEADER: Siempre visible */}
          <div
            className="p-4 flex items-center justify-between cursor-pointer active:bg-gray-50 transition-colors border-b"
            onClick={() => toggleRow(empresa.id)}
          >
            {/* 1. IZQUIERDA: Logo */}
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
              <img
                src={empresa.logoUrl}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 2. MEDIO: Información centrada */}
            <div className="flex-1 text-center px-2">
              <p className="font-black text-indigo-600 text-sm uppercase leading-tight">
                {empresa.nombreComercio}
              </p>
              <div className="flex flex-col items-center justify-center  mt-0.5">
                <p className="text-[12px] text-gray-400 font-bold uppercase tracking-tighter shrink-0">
                  CUIT: {empresa.cuit}
                </p>
                <p className="text-[12px] text-indigo-400 font-medium lowercase  max-w-[30]">
                  {empresa.emailEmpresa}
                </p>
              </div>
            </div>

            {/* 3. DERECHA: Botón Acordeón */}
            <div className="shrink-0">
              <div
                className={`p-2 rounded-full bg-gray-50 text-indigo-500 transition-all duration-300 ${
                  expandedRows[empresa.id] ? "rotate-180 bg-indigo-50" : ""
                }`}
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
                    strokeWidth={3}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {expandedRows[empresa.id] && (
            <div className="px-5 pb-5 space-y-3 animate-fadeIn border-b-2 border-gray-800">
              <div className="flex justify-between text-xs pt-2 border-t border-gray-50">
                <span className="text-gray-400 font-bold uppercase">
                  Categoría
                </span>
                <span className="font-medium">
                  {empresa.categoria || "Sin categoría"}
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-gray-400 font-bold uppercase">
                  Ubicación
                </span>
                <div className="text-right">
                  <p>{empresa.direccion}</p>
                  <p className="text-gray-400 text-[12px]">
                    Barrio: {empresa.barrio}, {empresa.ciudad}
                  </p>
                </div>
              </div>

              <div className="flex justify-between text-xs pt-2 border-t">
                <span className="text-gray-400 font-bold uppercase">
                  Contactos
                </span>
                <div className="text-right space-y-1">
                  <p>
                    <span className="text-gray-400">Dueño:</span>{" "}
                    {empresa.duenoNombre} ({empresa.duenoCel})
                  </p>
                  <p>
                    <span className="text-gray-400">Encargado:</span>{" "}
                    {empresa.encargadoNombre
                      ? `${empresa.encargadoNombre} (${empresa.encargadoCel})`
                      : "Sin especificar"}
                  </p>
                </div>
              </div>

              <div className="flex justify-between text-xs pt-2 border-t text-indigo-600">
                <span className="font-bold uppercase">Sorteo</span>
                <p className="font-black">{empresa.productoSorteo}</p>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-gray-400 font-bold uppercase">
                  Fecha Sorteo
                </span>
                <p className="font-bold">
                  {empresa.fechaSorteo.split("-").reverse().join("-")}
                </p>
              </div>

              <div className="flex justify-between text-sm p-2 border font-black text-green-600">
                <span>COSTO SERVICIO</span>
                <p>{formatCurrency(empresa.costoServicio)}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl flex justify-between items-center border">
                <span className="text-[15px] font-bold text-gray-400 uppercase tracking-widest">
                  Accesos
                </span>
                <div className="text-right">
                  <p className="text-[12px]">
                    Usuario: {empresa.usuarioEmpresa}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-[14px]">
                      {showPass[empresa.id]
                        ? empresa.passwordEmpresa
                        : "••••••••"}
                    </p>
                    <button
                      onClick={() => togglePass(empresa.id, setShowPass)}
                      className="text-indigo-400"
                    >
                      👁
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="flex flex-col border p-2 rounded-lg bg-gray-50 text-center gap-1">
                  <p className="text-sm">Estado: </p>
                  <span
                    className={`text-[14px] font-black uppercase ${empresa.estaActiva ? "text-green-500" : "text-red-400"}`}
                  >
                    {empresa.estaActiva ? "ACTIVA" : "INACTIVA"}
                  </span>
                  <span className="text-[12px] text-gray-400">
                    Alta: {empresa.fechaAlta?.toDate?.().toLocaleDateString()}
                  </span>
                </div>
                <div className="border p-1 py-4 rounded-lg ">
                  <p className="text-[12px] text-black-400 font-bold uppercase tracking-tighter underline">
                    Contrato Hasta:
                  </p>
                  <span
                    className={`block text-center text-[16px] font-bold ${(() => {
                      // 1. Usar la propiedad correcta: vigenciaContrato
                      if (!empresa.vigenciaContrato) return "text-gray-400";

                      // 2. Split por "-" porque viene como YYYY-MM-DD
                      const [anio, mes, dia] = empresa.vigenciaContrato
                        .split("-")
                        .map(Number);

                      // 3. Crear fecha (mes es 0-indexado, por eso mes - 1)
                      const fechaVigencia = new Date(anio, mes - 1, dia);
                      const hoy = new Date();

                      // 4. Calcular diferencia
                      const diasRestantes = Math.ceil(
                        (fechaVigencia - hoy) / (1000 * 60 * 60 * 24),
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
                            .join("-") // Muestra DD-MM-YYYY
                        : "Sin especificar vigencia"
                      : "Requiere Activación"}
                  </span>
                </div>

                <div className="flex justify-center gap-1">
                  <button
                    className="p-1 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Editar"
                    onClick={() => onEdit(empresa, { title: "Editar" })}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
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
                    onClick={(e) => {
                      e.preventDefault(); // Evita cualquier acción por defecto
                      e.stopPropagation(); // DETIENE la propagación al contenedor de la tarjeta
                      handleDeleteCompany(empresa.id, empresa.nombreComercio);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
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
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MobileCardList;
