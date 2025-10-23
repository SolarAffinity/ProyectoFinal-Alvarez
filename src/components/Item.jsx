import { Link } from 'react-router-dom'
import { clp } from '../utils/format'

export default function Item({item}){
  return (
    <article>
      <img src={item.thumb || 'https://placehold.co/600x360?text=Solar+Affinity'} alt={item.title} style={{width:'100%', borderRadius:'10px'}}/>
      <h3>{item.title}</h3>
      <p style={{minHeight:'3rem'}}>{item.shortDesc}</p>
      <p><strong>{clp(item.price)}</strong></p>
      <div style={{display:'flex', gap:'.6rem'}}>
        <Link className="btn" to={`/item/${item.id}`}>Ver detalle</Link>
        <Link className="btn alt" to="/cart">Comprar</Link>
      </div>
    </article>
  )
}
