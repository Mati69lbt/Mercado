// src/.../utils/uploadLogo.js
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

export const uploadLogo = async (file, companyName) => {
  if (!file) return null;

  // Creamos una referencia única para la imagen
  const storageRef = ref(storage, `logos/${companyName}_${Date.now()}`);

  // Subimos el archivo
  await uploadBytes(storageRef, file);

  // Obtenemos la URL de descarga
  const url = await getDownloadURL(storageRef);
  return url;
};
