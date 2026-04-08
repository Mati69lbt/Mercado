import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomBanner } from "../../../../Public/Empresas/util/bannerColors";
import Banner from "../Utils/Banner";
import { useUser } from "../Utils/useUser";
import { saveService } from "../Utils/saveService";

const CreateServices = () => {
  const navigate = useNavigate();
  const { empresa, loading } = useUser();
  const [banner] = useState(getRandomBanner);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Llamamos a la lógica externa pasando lo necesario
    saveService({ titulo, descripcion, empresa, navigate });
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner
        empresa={empresa}
        banner={banner}
        buttonText="Volver"
        onButtonClick={() => navigate("/empresa/dashboard")}
      />

      {/* FORMULARIO */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
        >
          <div className="space-y-6">
            {/* Input Titulo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Título del servicio
              </label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ej: Mantenimiento de Aires Acondicionados"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-gray-600"
              />
            </div>

            {/* Input Descripcion */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descripción detallada
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Contanos de qué trata el servicio..."
                rows="5"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-gray-600 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all transform active:scale-[0.98]"
            >
              Publicar Servicio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServices;
