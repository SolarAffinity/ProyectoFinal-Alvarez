import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebase";
import { useCart } from "../context/CartContext";

export default function CheckoutForm(){
  const { items, totalPrice, clearCart } = useCart();
  const [buyer, setBuyer] = useState({ name:'', email:'', phone:'' });
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e){
    e.preventDefault();
    if(items.length===0) return;
    setLoading(true);
    try{
      const order = {
        buyer,
        items: items.map(i => ({ id:i.id, title:i.title, qty:i.qty, price:i.price })),
        total: totalPrice,
        createdAt: serverTimestamp()
      };
      const ref = await addDoc(collection(db, 'orders'), order);
      setOrderId(ref.id);
      clearCart();
    }catch(err){
      console.error(err);
      alert('Hubo un error creando la orden');
    }finally{
      setLoading(false);
    }
  }

  if(orderId){
    return (
      <section className="container stack">
        <h2>¡Gracias por tu compra!</h2>
        <p className="success">ID de orden: <strong>{orderId}</strong></p>
      </section>
    )
  }

  return (
    <section className="container stack" style={{maxWidth: 560}}>
      <h2>Checkout</h2>
      {items.length===0 ? <p className="muted">No tienes productos en el carrito.</p> : null}
      <form className="stack" onSubmit={handleSubmit}>
        <label className="stack">
          <span>Nombre</span>
          <input required value={buyer.name} onChange={e=> setBuyer(v=> ({...v, name:e.target.value}))} />
        </label>
        <label className="stack">
          <span>Email</span>
          <input type="email" required value={buyer.email} onChange={e=> setBuyer(v=> ({...v, email:e.target.value}))} />
        </label>
        <label className="stack">
          <span>Teléfono</span>
          <input required value={buyer.phone} onChange={e=> setBuyer(v=> ({...v, phone:e.target.value}))} />
        </label>
        <button className="btn" disabled={loading || items.length===0}>{loading ? 'Procesando...' : 'Confirmar compra'}</button>
      </form>
    </section>
  );
}
