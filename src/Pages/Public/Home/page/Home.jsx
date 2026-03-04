import React from "react";
import { Link, useParams } from "react-router-dom";
import mpna from "../../../../assets/mpna1.png";
import mstafe from "../../../../assets/mstafe1.png";

const Home = () => {
  const { ciudadId } = useParams();
  const headerBg = ciudadId === "parana" ? "bg-red-500" : "bg-blue-600";
  const img = ciudadId === "parana" ? mpna : mstafe;
  return (
    <div className="min-h-screen bg-white">
      <header className={`${headerBg} text-white`}>
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Logo / icono */}

            {/* Logo en tu Home.jsx */}
            <div className="flex items-center bg-white p-2 rounded-lg shadow-md">
              <img
                src={img}
                alt="Logo Mercado"
                className="h-20 w-auto object-contain" // Subí la altura de h-12 a h-16 o h-20
              />
            </div>

            {/* Buscador */}
            <form className="w-full md:max-w-xl">
              <div className="flex items-center gap-2 rounded-xl bg-white px-2 py-2 text-gray-900 shadow-sm">
                <button
                  type="submit"
                  className="grid h-9 w-9 place-items-center rounded-lg hover:bg-gray-100"
                  aria-label="Buscar"
                  title="Buscar"
                >
                  <svg
                    width="18"
                    height="18"
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
                  className="w-full bg-transparent px-1 text-sm outline-none"
                  placeholder="Buscar productos, marcas o negocios…"
                />
              </div>
            </form>

            {/* Categorías */}
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2 text-sm font-semibold hover:bg-white/20"
              >
                <svg
                  width="18"
                  height="18"
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
            </div>
            <Link to="/:ciudadId/empresas">
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2 text-sm font-semibold hover:bg-white/20"
                >
                  <svg
                    width="18"
                    height="18"
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
                  Empresas
                </button>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="p-10 border">
        <p className="mt-4 text-gray-600">
          Aquí irá el buscador estilo MeLi y el listado de productos...
        </p>
      </main>
    </div>
  );
};

export default Home;
