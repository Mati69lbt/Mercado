import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../../Firebase/config";
import { Loading, Notify } from "notiflix";

export const saveService = async ({
  titulo,
  descripcion,
  empresa,
  navigate,
}) => {
  if (!titulo.trim() || !descripcion.trim()) {
    Notify.warning("Por favor, completá todos los campos");
    return;
  }

  try {
    Loading.standard("Publicando servicio...");

    await addDoc(collection(db, "servicios"), {
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      empresaId: empresa.id,
      fechaCreacion: serverTimestamp(),
      ciudad: empresa.ciudad,
    });

    Loading.remove();
    Notify.success("¡Servicio publicado con éxito!");
    navigate("/empresa/dashboard");
  } catch (error) {
    console.error(error);
    Loading.remove();
    Notify.failure("Error al publicar el servicio");
  }
};
