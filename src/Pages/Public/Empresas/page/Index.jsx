import { Loading } from "notiflix";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { subscribeToCompanies } from "../../../Private/Admin/CompanyManage/utils/getCompanies";

const Index = () => {
  const { ciudadId } = useParams();
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Loading.standard("Cargando base de datos...");
    const unsubscribe = subscribeToCompanies((data) => {
      const filtered = data.filter(
        (company) => company.ciudad?.toLowerCase() === ciudadId?.toLowerCase(),
      );
      setCompanies(filtered);
      setIsLoading(false);
      Loading.remove();
    });
    return () => {
      unsubscribe();
      Loading.remove();
    };
  }, [ciudadId]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 capitalize">
        Empresas en {ciudadId}
      </h1>

      {companies.length === 0 && !isLoading ? (
        <p className="text-gray-500">
          No hay empresas registradas en esta ciudad todavía.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {companies.map((company) => (
            <div
              key={company.id}
              className="flex flex-col items-center group cursor-pointer"
            >
              {/* Contenedor del Logo */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-gray-100 p-2 shadow-sm hover:shadow-md transition-shadow bg-white flex items-center justify-center overflow-hidden">
                <img
                  src={company.logoUrl || "https://via.placeholder.com/150"}
                  alt={company.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              {/* Nombre de la empresa */}
              <span className="mt-3 text-sm font-medium text-gray-700 text-center group-hover:text-green-600">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
