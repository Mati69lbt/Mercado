import { Loading } from "notiflix";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { subscribeToCompany } from "../util/Utils";
import { getRandomBanner } from "../util/bannerColors";

const EmpresaInfo = () => {
  const { empresaId, ciudadId } = useParams();
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [banner] = useState(getRandomBanner);
  const navigate = useNavigate();

  console.log("company", company);

  useEffect(() => {
    Loading.standard("Cargando empresa...");
    const unsubscribe = subscribeToCompany(empresaId, (data) => {
      setCompany(data);
      setIsLoading(false);
      Loading.remove();
    });
    return () => {
      unsubscribe();
      Loading.remove();
    };
  }, [empresaId]);

  if (isLoading) return null;

  if (!company) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-gray-500">Empresa no encontrada.</p>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* BANNER */}
      <div
        className="w-full rounded-2xl flex items-center px-8 gap-6 mb-6 relative overflow-hidden"
        style={{ background: banner, height: "180px" }}
      >
        {/* Círculos decorativos */}
        <div className="absolute right-[-40px] top-[-40px] w-56 h-56 rounded-full bg-white/5" />
        <div className="absolute right-[60px] bottom-[-60px] w-40 h-40 rounded-full bg-white/5" />

        {/* Logo */}
        <div
          className="w-[90px] h-[90px] rounded-full bg-white border-[3px] border-white/70 shadow-md flex items-center justify-center overflow-hidden shrink-0 z-10 cursor-pointer"
          onClick={() => navigate("/auth")}
        >
          <img
            src={company.logoUrl || "https://via.placeholder.com/150"}
            alt={company.nombreComercio}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Info central */}
        <div className="flex-1 text-center z-10">
          <p className="text-white font-bold text-2xl mb-1">
            {company.nombreComercio}
          </p>
          {company.categoria && (
            <span className="inline-block text-[11px] text-white/85 bg-white/15 border border-white/25 rounded-full px-3 py-0.5">
              {company.categoria}
            </span>
          )}
          {company.ciudad && (
            <p className="text-white/75 text-xs mt-1">
              {company.ciudad}, Entre Ríos
            </p>
          )}
        </div>
      </div>

      {/* SORTEO ACTIVO */}
      {company.productoSorteo && (
        <div className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
          <span className="text-2xl">🎁</span>
          <div className="flex-1">
            <p className="text-xs text-gray-400 mb-0.5">Sorteo activo</p>
            <p className="text-base font-semibold text-gray-800">
              {company.productoSorteo}
            </p>
          </div>
          {company.fechaSorteo && (
            <span className="text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1">
              {company.fechaSorteo.split("-").reverse().join("-")}
            </span>
          )}
        </div>
      )}

      {/* SEPARADOR */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
          Información del comercio
        </span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      {/* INFO CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {company.direccion && (
          <div className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 p-4">
            <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 mb-0.5">Dirección</p>
              <p className="text-sm font-medium text-gray-800">
                {company.direccion}
              </p>
            </div>
          </div>
        )}
        {company.duenoCel && (
          <div className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 p-4">
            <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 mb-0.5">Teléfono</p>
              <p className="text-sm font-medium text-gray-800">
                {company.duenoCel}
              </p>
            </div>
          </div>
        )}
        {company.emailEmpresa && (
          <div className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 p-4">
            <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 mb-0.5">Email</p>
              <p className="text-sm font-medium text-gray-800">
                {company.emailEmpresa}
              </p>
            </div>
          </div>
        )}
        {company.categoria && (
          <div className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 p-4">
            <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="2"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 mb-0.5">Categoría</p>
              <p className="text-sm font-medium text-gray-800">
                {company.categoria}
              </p>
            </div>
          </div>
        )}
        {company.descripcionCorta && (
          <div className="flex items-start gap-3 bg-white rounded-2xl border border-gray-100 p-4 sm:col-span-2">
            <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 mb-0.5">Sobre nosotros</p>
              <p className="text-sm font-medium text-gray-800">
                {company.descripcionCorta}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* SEPARADOR OFERTAS */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
          Ofertas
        </span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      {/* OFERTAS — por ahora vacío */}
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-10 text-center mb-6">
        <p className="text-base font-semibold text-gray-700 mb-1">
          Próximamente ofertas disponibles
        </p>
        <p className="text-sm text-gray-400">
          Este comercio todavía no publicó ofertas.
        </p>
      </div>

   
    </div>
  );
};

export default EmpresaInfo;
