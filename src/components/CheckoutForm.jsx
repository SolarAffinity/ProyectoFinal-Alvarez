import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { clp } from '../utils/format'

export default function CheckoutForm(){
  const { items, totalPrice } = useCart()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({name:'', email:'', phone:''})

  async function payMP(e){
    e.preventDefault()
    if(!items.length) return
    setLoading(true)
    try{
      // Guardar datos para registrar orden cuando MP regrese
      localStorage.setItem('pending_order', JSON.stringify({ buyer: form, items, total: totalPrice }))
      const resp = await fetch('/api/create-preference', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ items })
      })
      const data = await resp.json()
      if(data?.init_point){
        window.location.href = data.init_point
      }else{
        alert('No se pudo iniciar el pago.')
      }
    }catch(err){
      console.error(err)
      alert('Error al conectar con Mercado Pago')
    }finally{
      setLoading(false)
    }
  }

  if(!items.length) return <div className="container"><p>Tu carrito está vacío.</p></div>

  return (
    <div className="container">
      <h2>Checkout</h2>
      <p>Total a pagar: <strong>{clp(totalPrice)}</strong></p>
      <form className="card" onSubmit={payMP} style={{display:'grid', gap:'.6rem', maxWidth:'520px'}}>
        <input className="input" placeholder="Nombre" required value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input className="input" placeholder="Email" type="email" required value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <input className="input" placeholder="Teléfono" required value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
        <button className="btn" disabled={loading}>{loading? 'Redirigiendo a Mercado Pago...' : 'Pagar con Mercado Pago'}</button>
      </form>
      <p style={{marginTop:'1rem'}}>Serás redirigida a Mercado Pago para completar el pago de forma segura.</p>
    </div>
  )
}
