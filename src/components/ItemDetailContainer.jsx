import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProductById } from '../services/products'
import ItemDetail from './ItemDetail'

export default function ItemDetailContainer(){
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    setLoading(true)
    fetchProductById(id).then(p=>{ setProduct(p); setLoading(false) }).catch(e=>{ setError(e); setLoading(false) })
  },[id])

  if(loading) return <div className="container"><p>Cargando...</p></div>
  if(error) return <div className="container"><p>No se pudo cargar el producto.</p></div>
  if(!product) return <div className="container"><p>Producto no encontrado.</p></div>

  return <div className="container"><ItemDetail product={product} /></div>
}
