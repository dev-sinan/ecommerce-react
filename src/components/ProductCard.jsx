import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <img src={product.img} alt={product.name} className="w-full h-48 object-cover mb-3" />
      <h2 className="font-semibold">{product.name}</h2>
      <p className="text-gray-700">{product.price}</p>
      <button
        onClick={() => dispatch(addToCart(product))}
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
}
