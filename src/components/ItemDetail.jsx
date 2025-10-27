import { useState } from "react";
import { useCart } from "../context/CartContext";
import ItemCount from "./ItemCount";
import { Link } from "react-router-dom";

export default function ItemDetail({product}){
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd(qty){
    addItem(product, qty);
    setAdded(true);
  }

  return (
    <section className="container row" style={{alignItems:'flex-start'}}>
      <img src={product.thumbnails?.[0] || '/assets/placeholder.jpg'} alt={product.title} style={{width:'50%', borderRadius:16}} />
      <div className="stack" style={{width:'50%'}}>
        <h2>{product.title}</h2>
        <p className="muted">{product.description}</p>
        <div className="row"><span className="price">${(product.price||0).toLocaleString('es-CL')}</span><span className="muted">Stock: {product.stock ?? 0}</span></div>
        {!added ? (
          <ItemCount stock={product.stock ?? 0} initial={1} onAdd={handleAdd} />
        ) : (
          <div className="stack">
            <span className="success">¡Agregado al carrito!</span>
            <div className="row">
              <Link to="/carrito" className="btn">Ir al carrito</Link>
              <Link to="/" className="btn" style={{background:'#333'}}>Seguir comprando</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
