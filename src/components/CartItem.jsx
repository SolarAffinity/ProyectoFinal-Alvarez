import { clp } from '../utils/format'
import { useCart } from '../context/CartContext'

export default function CartItem({item}){
  const { removeItem } = useCart()
  return (
    <tr>
      <td>{item.title}</td>
      <td>{item.qty}</td>
      <td>{clp(item.price)}</td>
      <td>{clp(item.price * item.qty)}</td>
      <td><button className="btn alt" onClick={()=>removeItem(item.id)}>Eliminar</button></td>
    </tr>
  )
}
