import { useState } from 'react'
import emailjs from '@emailjs/browser'

export default function Agendar(){
  const [form, setForm] = useState({name:'', email:'', phone:'', address:'', message:''})
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function sendEmail(e){
    e.preventDefault()
    setLoading(true)
    try{
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      )
      setSent(true)
    }catch(err){
      console.error(err)
      alert('No se pudo enviar el mensaje.')
    }finally{
      setLoading(false)
    }
  }

  if(sent) return <div className="container card"><h2>Solicitud enviada ✅</h2><p>Te contactaremos a la brevedad.</p></div>

  return (
    <div className="container">
      <h2>Agendar visita técnica</h2>
      <form onSubmit={sendEmail} className="card" style={{display:'grid', gap:'.6rem', maxWidth:'640px'}}>
        <input className="input" placeholder="Nombre" required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <input className="input" type="email" placeholder="Email" required value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <input className="input" placeholder="Teléfono" required value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
        <input className="input" placeholder="Dirección" value={form.address} onChange={e=>setForm({...form, address:e.target.value})} />
        <textarea className="input" rows="4" placeholder="Mensaje" value={form.message} onChange={e=>setForm({...form, message:e.target.value})}></textarea>
        <button className="btn" disabled={loading}>{loading? 'Enviando...' : 'Enviar'}</button>
      </form>
    </div>
  )
}
