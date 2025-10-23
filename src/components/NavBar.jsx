import { NavLink, Link } from 'react-router-dom'
import CartWidget from './CartWidget'

export default function NavBar(){
  return (
    <nav className="nav">
      <div className="nav-inner container">
        <Link to="/" className="brand">
          <img src="public/logo.svg" alt="Solar Affinity" /> <span>Solar Affinity</span>
        </Link>
        <div className="menu">
          <NavLink to="/" className={({isActive})=>isActive? 'active':''}>Inicio</NavLink>
          <NavLink to="/servicios" className={({isActive})=>isActive? 'active':''}>Servicios</NavLink>
          <NavLink to="/simuladores" className={({isActive})=>isActive? 'active':''}>Simuladores</NavLink>
          <NavLink to="/agendar" className={({isActive})=>isActive? 'active':''}>Agendar visita</NavLink>
          <NavLink to="/nosotros" className={({isActive})=>isActive? 'active':''}>Nosotros</NavLink>
          <NavLink to="/cart" className={({isActive})=>isActive? 'active':''}>Carrito</NavLink>
        </div>
        <CartWidget />
      </div>
    </nav>
  )
}
