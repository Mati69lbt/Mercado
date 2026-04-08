import React from "react";

const Banner = ({ empresa, banner, buttonText, onButtonClick }) => {
  if (!empresa) return null;
  return (
    <div
      className="w-full flex items-center justify-center px-8 relative overflow-hidden" // Cambiamos gap-6 por justify-center
      style={{ background: banner, height: "180px" }}
    >
      {/* Círculos decorativos de fondo */}
      <div className="absolute right-10 top-10 w-56 h-56 rounded-full bg-white/5" />
      <div className="absolute right-15 bottom-15 w-40 h-40 rounded-full bg-white/5" />

      {/* CONTENEDOR INTERNO: Este limita qué tan lejos se van los elementos en PC */}
      <div className="w-full max-w-4xl flex items-center justify-around z-10">
        {/* 1. Logo */}
        <div className="w-22.5 h-22.5 rounded-full bg-white border-[3px] border-white/70 shadow-md flex items-center justify-center overflow-hidden shrink-0">
          <img
            src={empresa.logoUrl || "https://via.placeholder.com/150"}
            alt={empresa.nombreComercio}
            className="w-full h-full object-contain"
          />
        </div>

        {/* 2. Info - Quitamos flex-1 para que no empuje a los demás */}
        <div className="text-center px-4">
          <p className="text-white font-bold text-2xl mb-1">
            {empresa.nombreComercio}
          </p>
          {empresa.categoria && (
            <span className="inline-block text-[11px] text-white/85 bg-white/15 border border-white/25 rounded-full px-3 py-0.5">
              {empresa.categoria}
            </span>
          )}
          {empresa.ciudad && (
            <p className="text-white/75 text-xs mt-1">
              {empresa.ciudad}, Entre Ríos
            </p>
          )}
        </div>

        {/* 3. Botón salir */}
         <button
          onClick={onButtonClick} // Usa la función que le pases
          className="text-white/80 hover:text-white text-xs border border-white/30 rounded-xl px-4 py-2 transition-all hover:bg-white/10 shrink-0"
        >
          {buttonText} 
        </button>
      </div>
    </div>
  );
};

export default Banner;


