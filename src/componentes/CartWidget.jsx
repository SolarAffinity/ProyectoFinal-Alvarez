import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartWidget(){
  const { totalUnits } = useCart()
  return (
    <Link aria-label="Carrito" to="/cart" className="cart-btn">
      <span>🛒</span> <span className="badge">{totalUnits}</span>
    </Link>
  )
}
