import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/products";
import Loader from "./Loader";
import ItemDetail from "./ItemDetail";

export default function ItemDetailContainer(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    let mounted = true;
    (async ()=>{
      const data = await fetchProductById(id);
      if(mounted){
        setProduct(data);
        setLoading(false);
      }
    })();
    return ()=>{ mounted = false };
  }, [id]);

  if(loading) return <Loader />;
  if(!product) return <p>Producto no encontrado.</p>;
  return <ItemDetail product={product} />;
}
