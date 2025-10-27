import { Link } from "react-router-dom";

export default function Item({product}){
  return (
    <article className="card">
      <img src={product.thumbnails?.[0] || '/assets/placeholder.jpg'} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="muted">{product.description}</p>
      <div className="row">
        <span className="price">${(product.price || 0).toLocaleString('es-CL')}</span>
        <Link to={`/item/${product.id}`} className="btn right">Ver detalle</Link>
      </div>
    </article>
  );
}
