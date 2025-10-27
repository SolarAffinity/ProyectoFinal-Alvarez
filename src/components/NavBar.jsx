import { Link, NavLink } from "react-router-dom";
import CartWidget from "./CartWidget";

export default function NavBar(){
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" aria-label="Inicio">
          <span className="logo" />
        </Link>
        <nav>
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/categoria/fotovoltaico">Fotovoltaico</NavLink>
          <NavLink to="/categoria/termosolar">Termosolar</NavLink>
          <NavLink to="/carrito" className="cart">Carrito</NavLink>
          <CartWidget />
        </nav>
      </div>
    </header>
  );
}
