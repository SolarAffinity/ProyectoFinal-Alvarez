import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="container hero">
      <div className="card">
        <h1>Instalaciones solares residenciales</h1>
        <p>Fotovoltaico (5–10 kW híbridos), termosolar y mantenciones. En Santiago y alrededores.</p>
        <div style={{display:'flex', gap:'.6rem', flexWrap:'wrap'}}>
          <Link className="btn" to="/servicios">Ver Servicios</Link>
          <Link className="btn alt" to="/agendar">Agendar visita técnica</Link>
        </div>
      </div>
    </div>
  )
}
