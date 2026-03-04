// cspell: ignore notiflix querés
import React, { useEffect, useState } from "react";
import { auth } from "../../../../Firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import useForm from "../../../../hooks/useForm";
import { initialBusinessForm } from "../utils/configCompany";
import { handleSubmit } from "../utils/creatCompany";
const Admin = () => {
  const [user, loading] = useAuthState(auth);
  const { form, changed, setValue } = useForm(initialBusinessForm);
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    if (loading) {
      // Configuramos el estilo y lo mostramos
      Loading.pulse("Verificando credenciales...", {
        backgroundColor: "rgba(0,0,0,0.8)",
        svgColor: "#4f46e5",
      });
    } else {
      Loading.remove();
    }
  }, [loading]);

  if (!loading && !user) {
    return <Navigate to="/" />;
  }

  if (loading) return null;

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleLogout = () => {
    Confirm.show(
      "Cerrar Sesión",
      "¿Estás seguro de que querés salir? No te rindas ahora.",
      "Sí, salir",
      "No, me quedo",
      async () => {
        // Esto se ejecuta si el usuario hace clic en "Sí"
        try {
          Loading.standard("Cerrando sesión...");
          await signOut(auth);
          Loading.remove();
        } catch (error) {
          Loading.remove();
          console.error("Error al cerrar sesión:", error);
        }
      },
      () => {
        // Esto se ejecuta si el usuario hace clic en "No"
        // No hace falta poner nada, solo se cierra el cartel
      },
      {
        // Personalización de colores para que pegue con tu estilo
        titleColor: "#1f2937",
        okButtonBackground: "#dc2626", // Rojo para salir
        cancelButtonBackground: "#4b5563",
        borderRadius: "12px",
      },
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Panel de Control</h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition"
        >
          Cerrar Sesión
        </button>
      </div>

      <div className="mt-10">
        <p className="text-gray-600">Bienvenido, {user.email}</p>
        {/* Aquí irá tu CRUD de Negocios próximamente */}
      </div>

      <form
        className="max-w-5xl mx-auto space-y-6"
        onSubmit={(e) => handleSubmit(e, form)}
      >
        {/* SECCIÓN 1: DATOS DEL LOCAL */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-indigo-600 border-b pb-2">
            1. Información del Local
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre del Comercio
              </label>
              <input
                name="nombreComercio"
                value={form.nombreComercio}
                onChange={changed}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ciudad
              </label>
              <input
                name="ciudad"
                value={form.ciudad}
                onChange={changed}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 bg-gray-50"
              ></input>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Barrio
              </label>
              <input
                name="barrio"
                value={form.barrio}
                onChange={changed}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 bg-gray-50"
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Dirección Exacta
              </label>
              <input
                name="direccion"
                value={form.direccion}
                onChange={changed}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Empresa
              </label>
              <input
                name="emailEmpresa"
                value={form.emailEmpresa}
                onChange={changed}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Categoría
              </label>
              <input
                name="categoria"
                placeholder="Ej: Gastronomía"
                value={form.categoria}
                onChange={changed}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 bg-gray-50"
              />
            </div>
          </div>
        </div>
        {/* SECCIÓN 2: CONTACTO Y DUEÑO */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-indigo-600 border-b pb-2">
            2. Contacto Administrativo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dueño
              </label>
              <input
                name="duenoNombre"
                value={form.duenoNombre}
                onChange={changed}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Celular Dueño
              </label>
              <input
                name="duenoCel"
                type="number"
                value={form.duenoCel}
                onChange={changed}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Encargado
              </label>
              <input
                name="encargadoNombre"
                value={form.encargadoNombre}
                onChange={changed}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Celular Encargado
              </label>
              <input
                name="encargadoCel"
                type="number"
                value={form.encargadoCel}
                onChange={changed}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* SECCIÓN 3: CREDENCIALES Y ESTADO */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-indigo-600 border-b pb-2">
            3. Acceso y Configuración
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Usuario de Empresa
              </label>
              <input
                name="usuarioEmpresa"
                value={form.usuarioEmpresa}
                onChange={changed}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50"
                placeholder="ej: panaderiaelsol"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="passwordEmpresa"
                type="password"
                value={form.passwordEmpresa}
                onChange={changed}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                CUIT / CUIL
              </label>
              <input
                name="cuit"
                value={form.cuit}
                type="number"
                onChange={changed}
                placeholder="00-00000000-0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Costo del Servicio ($)
              </label>
              <input
                name="costoServicio"
                type="number"
                value={form.costoServicio}
                onChange={changed}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50"
              />
            </div>
          </div>

          {/* CHECKBOXES */}
          <div className="mt-6 flex flex-wrap gap-6 bg-indigo-50 p-4 rounded-lg">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.estaActiva}
                onChange={(e) => setValue("estaActiva", e.target.checked)} // Ya no falla
                className="rounded text-indigo-600 focus:ring-indigo-500 h-5 w-5"
              />
              <span className="text-sm font-bold text-gray-700">
                Empresa Activa
              </span>
            </label>
          </div>
          <div className="md:col-span-3 mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Informacion para saber más sobre el comercio (opcional)
            </label>
            <textarea
              name="descripcionCorta"
              value={form.descripcionCorta}
              onChange={changed}
              rows="3"
              placeholder="Ej: Aca guardamos informacion adcional de nuestros clientes"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm p-2 bg-white focus:border-indigo-500 focus:ring-indigo-500 resize-none outline-none transition-colors"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-indigo-600 border-b pb-2">
            4. Identidad Visual
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
              {logoFile ? (
                <img
                  src={URL.createObjectURL(logoFile)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-xs text-center p-2">
                  Sin Logo
                </span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition-all transform active:scale-95"
        >
          GUARDAR NUEVA EMPRESA
        </button>
      </form>
    </div>
  );
};

export default Admin;
