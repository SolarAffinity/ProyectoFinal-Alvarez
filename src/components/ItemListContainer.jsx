import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAllProducts, fetchProductsByCategory } from "../services/products";
import Loader from "./Loader";
import ItemList from "./ItemList";

export default function ItemListContainer(){
  const { categoryId } = useParams();
  const [products, setProducts] = useState(null);

  useEffect(()=>{
    let mounted = true;
    (async ()=>{
      if(categoryId){
        const data = await fetchProductsByCategory(categoryId);
        if(mounted) setProducts(data);
      }else{
        const data = await fetchAllProducts();
        if(mounted) setProducts(data);
      }
    })();
    return ()=>{ mounted = false };
  }, [categoryId]);

  if(!products) return <Loader />;
  if(products.length === 0) return <p>No hay productos en esta categoría.</p>;
  return <ItemList products={products} />
}
