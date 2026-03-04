import React, { useEffect, useState } from "react";
import { subscribeToCompanies } from "../utils/getCompanies";

const Empresas = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Nos suscribimos a los datos al montar el componente
    const unsubscribe = subscribeToCompanies(setCompanies);
    return () => unsubscribe(); // Limpiamos la suscripción al salir
  }, []);

  return (
    <div className="mt-12 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Comercio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Ciudad
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Usuario
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Estado
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {companies.map((company) => (
            <tr key={company.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                {company.nombreComercio}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {company.ciudad}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {company.usuarioEmpresa}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${company.estaActiva ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {company.estaActiva ? "Activo" : "Inactivo"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Empresas;
