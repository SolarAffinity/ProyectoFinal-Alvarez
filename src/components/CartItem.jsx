import { useCart } from "../context/CartContext";

export default function CartItem({item}){
  const { removeItem } = useCart();
  return (
    <article className="card row">
      <img src={item.thumbnail || '/assets/placeholder.jpg'} alt={item.title} style={{width:96, height:72, objectFit:'cover', borderRadius:12}} />
      <div className="stack" style={{flex:1}}>
        <strong>{item.title}</strong>
        <span className="muted">Cantidad: {item.qty}</span>
      </div>
      <span>${(item.qty * item.price).toLocaleString('es-CL')}</span>
      <button onClick={()=> removeItem(item.id)} className="btn">Quitar</button>
    </article>
  );
}
