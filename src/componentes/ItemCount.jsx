import { useEffect, useState } from 'react'

export default function ItemCount({stock=10, initial=1, onAdd}){
  const [qty, setQty] = useState(initial)
  useEffect(()=>{ if(qty>stock) setQty(stock) },[stock])
  function dec(){ setQty(q=> Math.max(1, q-1)) }
  function inc(){ setQty(q=> Math.min(stock, q+1)) }
  return (
    <div style={{display:'flex', gap:'.6rem', alignItems:'center'}}>
      <button className="btn alt" onClick={dec} disabled={qty<=1}>-</button>
      <strong>{qty}</strong>
      <button className="btn alt" onClick={inc} disabled={qty>=stock}>+</button>
      <button className="btn" onClick={()=>onAdd(qty)} disabled={stock<=0}>Agregar</button>
    </div>
  )
}
