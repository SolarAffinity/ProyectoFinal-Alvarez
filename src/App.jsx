import { Route, Routes, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import { CartProvider } from "./context/CartContext";

function HomeHero(){
  return (
    <section className="hero">
      <div className="container">
        <h1>Nos mueve el sol ☀️</h1>
        <p>Instalaciones <strong>fotovoltaicas</strong> y <strong>termosolares</strong> para hogares de Chile.</p>
        <Link className="btn" to="/categoria/fotovoltaico">Ver catálogo</Link>
      </div>
    </section>
  );
}

function Footer(){
  return (
    <footer>
      <div className="container row">
        <span>© {new Date().getFullYear()} Solar Affinity SpA</span>
        <div className="icons">
          <a href="#" aria-label="Instagram">📸</a>
          <a href="#" aria-label="WhatsApp">💬</a>
          <a href="mailto:hola@solaraffinity.cl" aria-label="Gmail">✉️</a>
        </div>
      </div>
    </footer>
  )
}

export default function App(){
  return (
    <CartProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<><HomeHero /><ItemListContainer /></>} />
        <Route path="/categoria/:categoryId" element={<ItemListContainer />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="*" element={<main className="container"><p>404 — Página no encontrada.</p></main>} />
      </Routes>
      <Footer />
    </CartProvider>
  )
}
