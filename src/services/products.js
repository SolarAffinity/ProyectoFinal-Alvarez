// src/services/products.js
import { collection, getDocs, getDoc, doc, query, where, limit } from 'firebase/firestore'
import { db } from '../firebase.config'

// MOCK (fallback de emergencia en producción si Firestore no responde)
const MOCK = [
  { id: 'm1', title: 'Panel 550W', price: 199000, category: 'fotovoltaico', stock: 5 },
  { id: 'm2', title: 'Inversor 3kW', price: 349000, category: 'fotovoltaico', stock: 3 },
]

export async function fetchProducts(categoryId) {
  console.time('[fetchProducts]')
  try {
    console.log('[fetchProducts] categoryId =', categoryId)
    const ref = collection(db, 'products')
    const q = categoryId ? query(ref, where('category', '==', categoryId)) : ref
    const snap = await getDocs(q)
    console.log('[fetchProducts] snap.size =', snap.size)

    const items = snap.docs.map(d => {
      const data = d.data()
      return {
        id: d.id,
        title: data?.title ?? data?.name ?? '(sin título)',
        price: Number(data?.price ?? 0),
        category: data?.category ?? 'general',
        stock: Number(data?.stock ?? 0),
        image: data?.image ?? null,
        ...data,
      }
    })

    // Fallback si no hay nada
    if (!items.length) {
      console.warn('[fetchProducts] vacío. Usando MOCK temporal para no bloquear UI.')
      return MOCK
    }
    return items
  } catch (err) {
    console.error('[fetchProducts] Error:', err)
    // Último recurso: mock
    return MOCK
  } finally {
    console.timeEnd('[fetchProducts]')
  }
}

export async function fetchProductById(id) {
  console.time('[fetchProductById]')
  try {
    const ref = doc(db, 'products', id)
    const snap = await getDoc(ref)
    if (!snap.exists()) throw new Error('Producto no encontrado')
    const data = snap.data()
    return {
      id: snap.id,
      title: data?.title ?? data?.name ?? '(sin título)',
      price: Number(data?.price ?? 0),
      category: data?.category ?? 'general',
      stock: Number(data?.stock ?? 0),
      image: data?.image ?? null,
      ...data,
    }
  } catch (err) {
    console.error('[fetchProductById] Error:', err)
    throw err
  } finally {
    console.timeEnd('[fetchProductById]')
  }
}
