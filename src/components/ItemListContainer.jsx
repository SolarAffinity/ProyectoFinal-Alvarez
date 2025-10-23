import { useEffect, useState } from 'react'
import { fetchProducts } from '../services/products'

export default function ItemListContainer({ categoryId }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true
    setLoading(true)
    setError(null)

    fetchProducts(categoryId)
      .then(data => { if (alive) setItems(data) })
      .catch(err => { if (alive) setError(err?.message || 'Error cargando productos') })
      .finally(() => { if (alive) setLoading(false) })

    return () => { alive = false }
  }, [categoryId])

  if (loading) return <p>Cargando productos…</p>
  if (error)   return <p style={{color:'crimson'}}>Error: {error}</p>
  if (!items.length) return <p>No hay productos para mostrar.</p>

  return (
    <ul>
      {items.map(p => (
        <li key={p.id}>
          {p.title} — ${p.price?.toLocaleString?.('es-CL') ?? p.price}
        </li>
      ))}
    </ul>
  )
}

