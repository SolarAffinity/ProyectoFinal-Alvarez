import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext();

export function CartProvider({children}){
  const [items, setItems] = useState([]); // {id, title, price, qty, stock, thumbnail}

  function addItem(product, qty){
    setItems(prev => {
      const idx = prev.findIndex(p => p.id === product.id);
      if(idx >= 0){
        const next = [...prev];
        const newQty = Math.min(next[idx].qty + qty, product.stock ?? 99);
        next[idx] = { ...next[idx], qty: newQty };
        return next;
      }
      return [...prev, { id: product.id, title: product.title, price: product.price, qty, stock: product.stock ?? 99, thumbnail: product.thumbnails?.[0] }];
    });
  }

  function removeItem(id){
    setItems(prev => prev.filter(p => p.id !== id));
  }

  function clearCart(){
    setItems([]);
  }

  const totalQty = items.reduce((a,b)=> a + b.qty, 0);
  const totalPrice = items.reduce((a,b)=> a + b.qty * b.price, 0);

  const value = useMemo(()=>({ items, addItem, removeItem, clearCart, totalQty, totalPrice }), [items, totalQty, totalPrice]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(){ return useContext(CartContext); }
