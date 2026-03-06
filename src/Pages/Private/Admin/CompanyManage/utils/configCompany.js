import { signOut } from "firebase/auth";
import { Confirm, Loading } from "notiflix";
import { auth } from "../../../../../Firebase/config";


// cspell: ignore cuit duenoCel duenoNombre encargadoCel encargadoNombre estaActiva descripcionCorta basico  categoria direccion


export const handleLogout = () => {
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
