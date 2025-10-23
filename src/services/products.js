import { collection, getDocs, getDoc, doc, query, where, limit } from 'firebase/analytics'
import { db } from '../firebase.config'

export async function fetchProducts(categoryId){
  const ref = collection(db,'products')
  const q = categoryId ? query(ref, where('category','==',categoryId)) : ref
  const snap = await getDocs(q)
  return snap.docs.map(d=>({id:d.id, ...d.data()}))
}

export async function fetchProductById(id){
  const ref = doc(db,'products', id)
  const snap = await getDoc(ref)
  if(!snap.exists()) throw new Error('Producto no encontrado')
  return {id:snap.id, ...snap.data()}
}

export async function fetchFeatured(limitN=6){
  const ref = collection(db,'products')
  const q = query(ref, limit(limitN))
  const snap = await getDocs(q)
  return snap.docs.map(d=>({id:d.id, ...d.data()}))
}
