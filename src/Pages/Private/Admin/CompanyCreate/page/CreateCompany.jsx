import React, { useEffect, useState } from "react";
import useForm from "../../../../../hooks/useForm";
import { initialBusinessForm } from "../utils/initialBusinessForm";
import CompanyForm from "../utils/CompanyForm";
import { useLocation, useNavigate } from "react-router-dom";
import { handleSubmit } from "../utils/createCompany";

const CreateCompany = () => {
  const { form, changed, setValue } = useForm(initialBusinessForm);
  const [logoFile, setLogoFile] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const empresaAEditar = location.state?.empresa || null;

  const nombreEmpresa = empresaAEditar?.nombreComercio || "";
  const id = empresaAEditar?.id || "";

  const handleFileChange = (e) => {
    if (!e) {
      setLogoFile(null);
      setValue("logoUrl", "");
      return;
    }
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setValue("logoUrl", "");
    }
  };

  const onSubmit = (e) => {
    // Llamamos a la lógica externa pasándole el logo
    handleSubmit(e, form, logoFile, navigate);
  };

  useEffect(() => {
    if (empresaAEditar) {
      Object.entries(empresaAEditar).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [empresaAEditar]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* --- ENCABEZADO CON TÍTULO Y BOTÓN VOLVER --- */}
      <div className="max-w-5xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {empresaAEditar ? "Actualización de" : "Gestión de"}{" "}
            <span className="text-indigo-600">Empresas</span>
          </h1>

          {/* Ajuste en el párrafo descriptivo */}
          <div className="text-gray-500 mt-1 flex flex-col md:flex-row justify-center items-center gap-1 italic text-center">
            {empresaAEditar ? (
              <>
                <span>Actualizando los datos de:</span>
                <span className="text-red-600 font-bold wrap-break-word">
                  {nombreEmpresa}{" "}
                </span>
                <span> (ID: {id})</span>
              </>
            ) : (
              <span>
                Registrá un nuevo cliente en la red de Mercado argentina
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => navigate(-1)} // Vuelve a la página anterior
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-xl shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-all active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Volver al Panel
        </button>
      </div>

      {/* --- FORMULARIO --- */}
      <div className="bg-white rounded-2xl shadow-xl p-2 md:p-6 border border-gray-100">
        <CompanyForm
          title={empresaAEditar ? "Editar Company" : "Crear Company"}
          form={form}
          changed={changed}
          setValue={setValue}
          logoFile={logoFile}
          handleFileChange={handleFileChange}
          handleSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default CreateCompany;
