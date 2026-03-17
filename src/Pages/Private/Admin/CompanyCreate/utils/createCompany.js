// cspell: ignore firestore Revisá notiflix
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
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
    const isEditing = !!form.id;
    Loading.standard(
      isEditing ? "Actualizando empresa..." : "Registrando nueva empresa...",
    );

    let urlFinal = form.logoUrl || "";

    if (logoFile) {
      const data = new FormData();
      data.append("file", logoFile);
      data.append("upload_preset", uploadPreset);
      data.append("cloud_name", cloudName);

      const response = await fetch(urlCloudinary, {
        method: "POST",
        body: data,
      });
      const fileData = await response.json();
      urlFinal = fileData.secure_url;
    }

    // 2. Referencia a la colección 'negocios'
    const { id, ...dataToSave } = form;
    const finalData = {
      ...dataToSave,
      costoServicio: Number(form.costoServicio),
      logoUrl: urlFinal,
      ultimaModificacion: serverTimestamp(),
    };

    if (isEditing) {
      // ACTUALIZAR: Usamos la referencia al documento existente
      const docRef = doc(db, "empresas", id);
      await updateDoc(docRef, finalData);
      Notify.success("Empresa actualizada correctamente");
    } else {
      // CREAR: Usamos addDoc como antes
      await addDoc(collection(db, "empresas"), {
        ...finalData,
        fechaAlta: serverTimestamp(),
      });
      Notify.success("Empresa creada correctamente");
    }

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
