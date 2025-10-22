import { Routes, Route, Link } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Servicios from './pages/Servicios'
import Nosotros from './pages/Nosotros'
import Agendar from './pages/Agendar'
import Simuladores from './pages/Simuladores'
import TE4Page from './pages/TE4'
import ItemDetailContainer from './components/ItemDetailContainer'
import Cart from './components/Cart'
import CheckoutForm from './components/CheckoutForm'
import CheckoutSuccess from './pages/CheckoutSuccess'
import { CartProvider } from './context/CartContext'

export default function App(){
  return (
    <CartProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/servicios" element={<Servicios/>} />
        <Route path="/category/:categoryId" element={<Servicios/>} />
        <Route path="/item/:id" element={<ItemDetailContainer/>} />
        <Route path="/nosotros" element={<Nosotros/>} />
        <Route path="/simuladores" element={<Simuladores/>} />
        <Route path="/te4" element={<TE4Page/>} />
        <Route path="/agendar" element={<Agendar/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<CheckoutForm/>} />
        <Route path="/checkout/success" element={<CheckoutSuccess/>} />
        <Route path="*" element={
          <div className="container"><h2>Página no encontrada</h2><Link className="btn" to="/">Volver</Link></div>
        } />
      </Routes>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Solar Affinity — Nos mueve el sol.</p>
        <p>
          <a href="https://wa.me/56940641465" target="_blank" rel="noreferrer">WhatsApp</a> ·
          <a href="mailto:solaraffinityycontacto@gmail.com" target="_blank" rel="noreferrer"> Email</a> ·
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"> Instagram</a>
        </p>
      </footer>
    </CartProvider>
  )
}
