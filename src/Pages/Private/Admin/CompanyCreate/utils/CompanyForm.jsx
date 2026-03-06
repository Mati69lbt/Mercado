// cspell: ignore duenoCel duenoNombre encargadoCel encargadoNombre cuit costoServicio productoSorteo fechaSorteo CUIL Informacion  categoria  descripcionCorta direccion panaderiaelsol 

const CompanyForm = ({
  form,
  changed,
  setValue,
  handleSubmit,
  logoFile,
  handleFileChange,
  title,
}) => {
  return (
    <div>
      {" "}
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
                required
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
                required
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
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Empresa
              </label>
              <input
                name="emailEmpresa"
                value={form.emailEmpresa}
                type="email"
                placeholder="email@empresa.com"
                onChange={changed}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 bg-gray-50"
                required
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
                required
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
                required
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
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  name="costoServicio"
                  value={form.costoServicio}
                  onChange={changed}
                  className="pl-7 mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50"
                />
                <p className="text-xs text-indigo-500 mt-1 font-semibold">
                  {new Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  }).format(form.costoServicio || 0)}
                </p>
              </div>
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
              placeholder="Ej: Aca guardamos información adicional de nuestros clientes"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm p-2 bg-white focus:border-indigo-500 focus:ring-indigo-500 resize-none outline-none transition-colors"
            />
          </div>
        </div>

        {/* PRODUCTO A SORTEAR */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Producto a Sortear
          </label>
          <input
            name="productoSorteo"
            value={form.productoSorteo}
            onChange={changed}
            placeholder="Ej: Una Pizza Grande"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50"
          />
        </div>

        {/* FECHA DEL SORTEO */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fecha del Sorteo
          </label>
          <input
            type="date"
            name="fechaSorteo"
            value={form.fechaSorteo}
            onChange={changed}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50"
          />
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
          {title === "Crear Company"
            ? "Guardar Nueva Empresa"
            : "Actualizar Información de la Empresa"}
        </button>
      </form>
    </div>
  );
};

export default CompanyForm;
