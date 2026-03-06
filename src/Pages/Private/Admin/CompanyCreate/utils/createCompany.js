// cspell: ignore firestore Revisá notiflix
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../../Firebase/config";
import { Loading, Notify } from "notiflix";


const urlCloudinary = import.meta.env.VITE_CLOUDINARY_URL;
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const handleSubmit = async (e, form, logoFile) => {
  e.preventDefault();

  // 1. Validar campos críticos antes de mandar
  if (!form.nombreComercio || !form.usuarioEmpresa || !form.passwordEmpresa) {
    Notify.warning(
      "Por favor, completa los campos obligatorios (Nombre, Usuario y Password)",
    );
    return;
  }

  try {
    Loading.standard("Registrando nueva empresa...");

    let urlFinal = "";

    if (logoFile) {
      const data = new FormData();
      data.append("file", logoFile);
      data.append("upload_preset", uploadPreset); 
      data.append("cloud_name", cloudName); 

      const response = await fetch(
        urlCloudinary,
        { method: "POST", body: data },
      );
      const fileData = await response.json();
      urlFinal = fileData.secure_url; 

      Notify.success("¡Logo cargado correctamente en la nube!");
    }

    // 2. Referencia a la colección 'negocios'
    const docRef = await addDoc(collection(db, "empresas"), {
      ...form,
      // Convertimos el costo a número por las dudas
      costoServicio: Number(form.costoServicio),
      logoUrl: urlFinal,
      fechaAlta: serverTimestamp(), // Marca de tiempo del servidor
    });

    Notify.success(`Empresa creada con ID: ${docRef.id}`);
    window.location.reload();

   setTimeout(() => {
     window.history.back();
   }, 1000);
  } catch (error) {
    console.error("Error al guardar en Firebase:", error);
    Notify.failure("Error de base de datos. Revisá las reglas de Firestore.");
  } finally {
    Loading.remove();
  }
};
