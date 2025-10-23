import CartItem from './CartItem'
import { useCart } from '../context/CartContext'
import { clp } from '../utils/format'
import { Link } from 'react-router-dom'

export default function Cart(){
  const { items, totalPrice, clear } = useCart()

  if(!items.length) return <div className="container"><p>🛒 Tu carrito está vacío.</p><Link className="btn" to="/servicios">Ver servicios</Link></div>

  return (
    <div className="container">
      <h2>Carrito</h2>
      <table className="table">
        <thead><tr><th>Producto</th><th>Cant.</th><th>Precio</th><th>Subtotal</th><th></th></tr></thead>
        <tbody>
          {items.map(it=> <CartItem key={it.id} item={it} />)}
        </tbody>
      </table>
      <p style={{textAlign:'right'}}><strong>Total: {clp(totalPrice)}</strong></p>
      <div style={{display:'flex', gap:'.6rem', justifyContent:'flex-end'}}>
        <button className="btn alt" onClick={clear}>Vaciar</button>
        <Link className="btn" to="/checkout">Ir a pagar</Link>
      </div>
    </div>
  )
}
