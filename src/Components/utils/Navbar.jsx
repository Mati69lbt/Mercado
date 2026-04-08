import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import mpna from "../../assets/pnaBand.png";
import mstafe from "../../assets/stafeMbande.png";

const Navbar = () => {
  const { ciudadId } = useParams();
  const navigate = useNavigate();

  const headerBg =
    ciudadId === "parana"
      ? "bg-gradient-to-r from-[#ED1C24] to-[#FF4500]"
      : "bg-gradient-to-r from-blue-700 to-blue-500";

  const img = ciudadId === "parana" ? mpna : mstafe;

  return (
    <header className={`${headerBg} text-white`}>
      <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3">
        {/* FILA 1: Logo + botones */}
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div
            className="flex-shrink-0 bg-white rounded-lg shadow-md px-2 py-1 cursor-pointer"
            onClick={() => navigate("/admin")}
          >
            <img
              src={img}
              alt="Logo Mercado"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Botones Categorías y Empresas */}
          <div className="flex items-center gap-2 ml-auto flex-wrap justify-end">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-3 py-2 text-sm font-semibold hover:bg-white/25 transition-colors whitespace-nowrap"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Categorías
            </button>

            <Link to={`/${ciudadId}/empresas`}>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-3 py-2 text-sm font-semibold hover:bg-white/25 transition-colors whitespace-nowrap"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3 9.5V21h6v-5h6v5h6V9.5L12 3 3 9.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Empresas
              </button>
            </Link>
          </div>
        </div>

        {/* FILA 2: Buscador */}
        <form className="w-full">
          <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-gray-900 shadow-sm">
            <button
              type="submit"
              className="grid h-8 w-8 place-items-center rounded-lg hover:bg-gray-100 flex-shrink-0"
              aria-label="Buscar"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21l-4.3-4.3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
              placeholder="Buscar productos, marcas o negocios…"
            />
          </div>
        </form>
      </div>
    </header>
  );
};

export default Navbar;
