import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../../../Firebase/config";
import { Loading, Notify } from "notiflix";
import { doc, updateDoc } from "firebase/firestore";

const buildEmail = (usuario) =>
  `${usuario.trim().toLowerCase()}@mercadoargentino.com`;

// Crea el usuario en Firebase Auth (se puede llamar también desde el botón manual)
export const crearUsuarioAuth = async (usuarioEmpresa, passwordEmpresa) => {
  const email = buildEmail(usuarioEmpresa);
  await createUserWithEmailAndPassword(auth, email, passwordEmpresa);
};

export const handleCrearAuth = async (empresa) => {
  if (!empresa.usuarioEmpresa || !empresa.passwordEmpresa) {
    Notify.warning("La empresa no tiene usuario o contraseña cargados.");
    return;
  }
  try {
    Loading.standard("Creando usuario...");
    await crearUsuarioAuth(empresa.usuarioEmpresa, empresa.passwordEmpresa);
    await updateDoc(doc(db, "empresas", empresa.id), { authCreado: true });
    Notify.success(`Usuario "${empresa.usuarioEmpresa}" creado correctamente.`);
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      Notify.warning("Este usuario ya tiene cuenta en Firebase Auth.");
    } else {
      console.error(error);
      Notify.failure("Error al crear el usuario. Revisá la consola.");
    }
  } finally {
    Loading.remove();
  }
};
