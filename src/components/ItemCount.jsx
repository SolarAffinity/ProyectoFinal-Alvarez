import { useEffect, useState } from "react";

export default function ItemCount({ stock=0, initial=1, onAdd }){
  const [qty, setQty] = useState(initial);

  useEffect(()=>{ if(qty > stock) setQty(stock || 0); }, [stock]); // ajuste si cambia stock

  const dec = ()=> setQty(q => Math.max(1, q-1));
  const inc = ()=> setQty(q => Math.min(stock, q+1));

  const disabled = stock === 0;

  return (
    <div className="stack">
      <div className="count">
        <button onClick={dec} disabled={disabled}>-</button>
        <strong>{qty}</strong>
        <button onClick={inc} disabled={qty>=stock || disabled}>+</button>
      </div>
      <button className="btn" disabled={disabled} onClick={()=> onAdd(qty)}>
        Agregar al carrito
      </button>
      {disabled && <span className="danger">Producto sin stock</span>}
    </div>
  );
}
