import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

export default function Cart(){
  const { items, clearCart, totalPrice } = useCart();

  if(items.length === 0){
    return (
      <section className="container">
        <h2>Carrito</h2>
        <p className="muted">Tu carrito está vacío.</p>
        <Link to="/" className="btn">Ver productos</Link>
      </section>
    )
  }

  return (
    <section className="container stack">
      <div className="row">
        <h2>Carrito</h2>
        <button className="btn right" onClick={clearCart}>Vaciar carrito</button>
      </div>
      <div className="stack">
        {items.map(i => <CartItem key={i.id} item={i} />)}
      </div>
      <div className="row">
        <strong>Total:</strong>
        <span className="price right">${totalPrice.toLocaleString('es-CL')}</span>
      </div>
      <Link to="/checkout" className="btn">Ir a pagar</Link>
    </section>
  );
}
