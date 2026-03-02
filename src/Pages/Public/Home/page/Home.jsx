import React from "react";
import { useParams } from "react-router-dom";

const Home = () => {
  const { ciudadId } = useParams();
  return (
    <div className="min-h-screen bg-white">
      <header
        className={`p-4 text-white font-bold text-center ${ciudadId === "parana" ? "bg-red-500" : "bg-blue-600"}`}
      >
        Bienvenido al Mercado de{" "}
        {ciudadId.charAt(0).toUpperCase() + ciudadId.slice(1)}
      </header>
      <main className="p-10">
        <h2 className="text-2xl font-bold">Ofertas en {ciudadId}</h2>
        <p className="mt-4 text-gray-600">
          Aquí irá el buscador estilo MeLi y el listado de productos...
        </p>
        {/* Aquí irán los botones a Sorteos y Empresas más adelante */}
      </main>
    </div>
  );
};

export default Home;
