import { useEffect, useState } from 'react'
import { fetchProducts } from '../services/products'

export function useProducts(categoryId){
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    let mounted = true
    setLoading(true)
    fetchProducts(categoryId).then(p=>{
      if(mounted){ setData(p); setLoading(false) }
    }).catch(e=>{
      console.error(e)
      setError(e); setLoading(false)
    })
    return ()=>{ mounted=false }
  },[categoryId])

  return {data, loading, error}
}
