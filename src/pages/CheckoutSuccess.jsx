import { useEffect, useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useCart } from '../context/CartContext'

export default function CheckoutSuccess(){
  const { clear } = useCart()
  const [orderId, setOrderId] = useState(null)
  const [status, setStatus] = useState('')

  useEffect(()=>{
    const params = new URLSearchParams(window.location.search)
    const payment_status = params.get('status') || params.get('collection_status') || ''
    setStatus(payment_status)
    const raw = localStorage.getItem('pending_order')
    if(!raw) return
    const pending = JSON.parse(raw)
    if(payment_status && payment_status.toLowerCase() === 'approved'){
      const save = async ()=>{
        const docRef = await addDoc(collection(db,'orders'), {
          buyer: pending.buyer,
          items: pending.items.map(i=>({id:i.id,title:i.title,price:i.price,qty:i.qty})),
          total: pending.total,
          mp: { status: payment_status, createdAt: serverTimestamp() },
          createdAt: serverTimestamp()
        })
        setOrderId(docRef.id)
        localStorage.removeItem('pending_order')
        clear()
      }
      save().catch(console.error)
    }
  }, [clear])

  return (
    <div className="container card">
      <h2>Resultado de pago</h2>
      <p>Estado de Mercado Pago: <strong>{status || 'desconocido'}</strong></p>
      {orderId ? (
        <p>¡Gracias! Tu orden fue registrada. ID: <strong>{orderId}</strong></p>
      ) : (
        <p>Si tu pago fue aprobado, la orden se registrará automáticamente.</p>
      )}
    </div>
  )
}
