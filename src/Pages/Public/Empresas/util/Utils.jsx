import { collection, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../../Firebase/config";

export const subscribeToCompany = (empresaId, callback) => {
  const ref = doc(db, "empresas", empresaId);
  const unsubscribe = onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      callback({ id: snap.id, ...snap.data() });
    } else {
      callback(null);
    }
  });
  return unsubscribe;
};

export const getEmpresaByUsuario = async (usuarioEmpresa) => {
  const q = query(
    collection(db, "empresas"),
    where("usuarioEmpresa", "==", usuarioEmpresa),
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};