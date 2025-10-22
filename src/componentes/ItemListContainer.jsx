import { useParams } from 'react-router-dom'
import ItemList from './ItemList'
import { useProducts } from '../hooks/useProducts'

export default function ItemListContainer(){
  const { categoryId } = useParams()
  const { data, loading, error } = useProducts(categoryId)

  if(loading) return <div className="container"><p>Cargando productos...</p></div>
  if(error) return <div className="container"><p>Hubo un problema al cargar los productos.</p></div>
  if(!data.length) return <div className="container"><p>No hay productos disponibles.</p></div>

  return (
    <div className="container">
      <h2>Catálogo {categoryId ? `— ${categoryId}` : ''}</h2>
      <ItemList items={data} />
    </div>
  )
}
