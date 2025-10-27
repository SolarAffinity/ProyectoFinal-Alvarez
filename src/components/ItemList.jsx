import Item from "./Item";

export default function ItemList({products}){
  return (
    <section className="container grid">
      {products.map(p => <Item key={p.id} product={p} />)}
    </section>
  );
}
