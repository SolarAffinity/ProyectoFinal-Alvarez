import { collection, getDocs, getDoc, doc, query, where } from "firebase/firestore";
import { db, PRODUCTS_COLLECTION } from "./firebase";

export async function fetchAllProducts(){
  const snap = await getDocs(collection(db, PRODUCTS_COLLECTION));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function fetchProductsByCategory(category){
  const q = query(collection(db, PRODUCTS_COLLECTION), where("category", "==", category));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function fetchProductById(id){
  const ref = doc(db, PRODUCTS_COLLECTION, id);
  const d = await getDoc(ref);
  if(!d.exists()) return null;
  return { id: d.id, ...d.data() };
}
