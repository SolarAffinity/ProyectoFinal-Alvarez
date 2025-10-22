import { useState } from 'react'

function PotenciaFV(){
  const [consumo, setConsumo] = useState(300) // kWh/mes
  const [horasSol, setHorasSol] = useState(4.5) // HSP
  const [rend, setRend] = useState(0.8)
  const potencia = Math.round((consumo*1000)/(30*horasSol*rend)) // W
  const paneles = Math.ceil(potencia / 550)
  return (
    <div className="card">
      <h3>Dimensionamiento Fotovoltaico</h3>
      <p>Estimación simple para potencia de inversor y cantidad de paneles (550W).</p>
      <div className="grid">
        <label style={{gridColumn:'span 4'}}>Consumo mensual (kWh) <input className="input" type="number" value={consumo} onChange={e=>setConsumo(+e.target.value||0)} /></label>
        <label style={{gridColumn:'span 4'}}>Horas Sol Pleno (HSP) <input className="input" type="number" step="0.1" value={horasSol} onChange={e=>setHorasSol(+e.target.value||0)} /></label>
        <label style={{gridColumn:'span 4'}}>Rendimiento global <input className="input" type="number" step="0.05" value={rend} onChange={e=>setRend(+e.target.value||0)} /></label>
      </div>
      <p>Sugerencia: Inversor ≈ <strong>{Math.ceil(potencia/1000)} kW</strong> — Paneles 550W: <strong>{paneles} u.</strong></p>
    </div>
  )
}

function Termosolar(){
  const [duchas, setDuchas] = useState(3)
  const [litros, setLitros] = useState(50)
  const total = duchas*litros
  const area = Math.max(1.5, Math.round(total/80*10)/10) // m² aprox
  return (
    <div className="card">
      <h3>Dimensionamiento Termosolar</h3>
      <div className="grid">
        <label style={{gridColumn:'span 6'}}>Duchas diarias <input className="input" type="number" value={duchas} onChange={e=>setDuchas(+e.target.value||0)} /></label>
        <label style={{gridColumn:'span 6'}}>Litros por ducha <input className="input" type="number" value={litros} onChange={e=>setLitros(+e.target.value||0)} /></label>
      </div>
      <p>Volumen diario: <strong>{total} L</strong> — Área de colector sugerida: <strong>{area} m²</strong></p>
    </div>
  )
}

function TE4(){
  const [panelesOK, setPanelesOK] = useState(false)
  const [proteccionesOK, setProteccionesOK] = useState(false)
  const [rotuladoOK, setRotuladoOK] = useState(false)
  const listo = panelesOK && proteccionesOK && rotuladoOK
  return (
    <div className="card">
      <h3>Checklist TE4 (resumen)</h3>
      <label><input type="checkbox" checked={panelesOK} onChange={e=>setPanelesOK(e.target.checked)} /> Paneles e inversor instalados según ficha técnica</label><br/>
      <label><input type="checkbox" checked={proteccionesOK} onChange={e=>setProteccionesOK(e.target.checked)} /> Protecciones CC/CA y puestas a tierra verificadas</label><br/>
      <label><input type="checkbox" checked={rotuladoOK} onChange={e=>setRotuladoOK(e.target.checked)} /> Rotulado/diagramas y etiquetado</label>
      <p>Estado: {listo? '✅ Listo para TE4' : '🟡 Pendiente'}</p>
    </div>
  )
}

export default function Simuladores(){
  return (
    <div className="container">
      <h2>Simuladores</h2>
      <div className="grid">
        <div style={{gridColumn:'span 6'}}><PotenciaFV/></div>
        <div style={{gridColumn:'span 6'}}><Termosolar/></div>
        <div style={{gridColumn:'span 12'}}><TE4/></div>
      </div>
    </div>
  )
}
