// src/.../utils/getCompanies.js
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../../../Firebase/config";


export const subscribeToCompanies = (setCompanies) => {
  // Traemos la colección 'negocios' ordenada por fecha
  const q = query(collection(db, "negocios"), orderBy("fechaAlta", "desc"));

  // onSnapshot nos permite ver cambios en tiempo real sin recargar
  return onSnapshot(q, (snapshot) => {
    const companiesList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCompanies(companiesList);
  });
};
