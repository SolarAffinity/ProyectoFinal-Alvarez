import { useState } from 'react'
import { clp } from '../utils/format'
import ItemCount from './ItemCount'
import { useCart } from '../context/CartContext'

export default function ItemDetail({product}){
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd(qty){
    addItem(product, qty)
    setAdded(true)
  }

  return (
    <article className="card">
      <div className="grid">
        <div style={{gridColumn:'span 6'}}>
          <img src={product.thumb || 'https://placehold.co/800x500?text=Solar+Affinity'} alt={product.title} style={{width:'100%', borderRadius:'10px'}}/>
        </div>
        <div style={{gridColumn:'span 6'}}>
          <h2>{product.title}</h2>
          <p>{product.longDesc}</p>
          <p><strong>{clp(product.price)}</strong> • Stock: {product.stock ?? 0}</p>
          {!added ? (
            <ItemCount stock={product.stock ?? 0} initial={1} onAdd={handleAdd} />
          ) : (
            <p>✅ Producto agregado al carrito.</p>
          )}
        </div>
      </div>
    </article>
  )
}
