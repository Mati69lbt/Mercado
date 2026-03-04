//cspell: ignore addDoc collection serverTimestamp db notiflix Firestore Revisá firestore
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Notify } from "notiflix";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { db } from "../../../../Firebase/config";
import { uploadLogo } from "./uploadLogo";

export const handleSubmit = async (e, form) => {
  e.preventDefault();

  // 1. Validar campos críticos antes de mandar
  if (!form.nombreComercio || !form.usuarioEmpresa || !form.passwordEmpresa) {
    Notify.warning(
      "Por favor, completa los campos obligatorios (Nombre, Usuario y Password)",
    );
    return;
  }

  Loading.standard("Registrando nueva empresa...");

  let url = "";
  if (logoFile) {
    url = await uploadLogo(logoFile, form.nombreComercio);
  }

  try {
    // 2. Referencia a la colección 'negocios'
    const docRef = await addDoc(collection(db, "negocios"), {
      ...form,
      // Convertimos el costo a número por las dudas
      costoServicio: Number(form.costoServicio),
      fechaAlta: serverTimestamp(), // Marca de tiempo del servidor
    });

    Notify.success(`Empresa creada con ID: ${docRef.id}`);

    window.location.reload();
  } catch (error) {
    console.error("Error al guardar en Firebase:", error);
    Notify.failure("Error de base de datos. Revisá las reglas de Firestore.");
  } finally {
    Loading.remove();
  }
};
