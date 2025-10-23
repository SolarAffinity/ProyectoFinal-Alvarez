import Item from './Item'

export default function ItemList({items}){
  return (
    <section className="grid">
      {items.map(p=> (
        <div key={p.id} className="card" style={{gridColumn:'span 4'}}>
          <Item item={p} />
        </div>
      ))}
    </section>
  )
}
