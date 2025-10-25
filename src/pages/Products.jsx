import  {shoes}  from "../data/shoes";
import ProductCard from "../components/ProductCard";

export default function Products() {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {shoes.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
