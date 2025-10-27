import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartWidget(){
  const { totalQty } = useCart();
  return (
    <Link to="/carrito" className="badge" aria-label="Ir al carrito">
      🛒 <span>{totalQty}</span>
    </Link>
  );
}
