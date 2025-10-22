import { createContext, useContext, useMemo, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({children}){
  const [items, setItems] = useState([]) // {id,title,price,qty,stock,thumb}

  // Persistencia
  useEffect(()=>{
    const raw = localStorage.getItem('cart_items')
    if(raw){ try{ setItems(JSON.parse(raw)) }catch{} }
  },[])
  useEffect(()=>{
    localStorage.setItem('cart_items', JSON.stringify(items))
  },[items])

  function addItem(product, qty){
    setItems(prev => {
      const i = prev.findIndex(p=>p.id===product.id)
      if(i>-1){
        const copy=[...prev]
        const newQty = Math.min(copy[i].qty + qty, product.stock ?? 99)
        copy[i]={...copy[i], qty:newQty}
        return copy
      }
      return [...prev, {...product, qty}]
    })
  }
  function removeItem(id){ setItems(prev=>prev.filter(p=>p.id!==id)) }
  function clear(){ setItems([]) }

  const totalUnits = useMemo(()=> items.reduce((a,b)=>a+b.qty,0),[items])
  const totalPrice = useMemo(()=> items.reduce((a,b)=>a+b.qty*b.price,0),[items])

  return <CartContext.Provider value={{items, addItem, removeItem, clear, totalUnits, totalPrice}}>
    {children}
  </CartContext.Provider>
}

export const useCart = ()=> useContext(CartContext)
