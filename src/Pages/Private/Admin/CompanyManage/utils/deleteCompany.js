import { deleteDoc, doc } from "firebase/firestore";
import { Confirm, Notify, Loading } from "notiflix";
import { db } from "../../../../../Firebase/config";

export const handleDeleteCompany = (id, nombre) => {
  console.log("id", id);
  console.log("nombre", nombre);

  Confirm.show(
    "Confirmar Eliminación",
    `¿Estás seguro de que deseas eliminar a ${nombre}?`,
    "Sí, eliminar",
    "No, cancelar",
    async () => {
      try {
        Loading.standard("Eliminando...");
        const docRef = doc(db, "empresas", id);
        await deleteDoc(docRef);

        Notify.success("Empresa eliminada correctamente");
      } catch (error) {
        console.error("Error al eliminar:", error);
        Notify.failure("No se pudo eliminar la empresa");
      } finally {
        Loading.remove();
      }
    },
    () => {
      // El usuario canceló, no hace falta hacer nada
    },
    {
      titleColor: "#4f46e5", // Indigo-600
      okButtonBackground: "#ef4444", // Red-500
      borderRadius: "12px",
    },
  );
};
