
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { shoes } from "../data/shoes";

export default function Products() {
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {shoes.map(shoe => (
        <div key={shoe.id} className="bg-white shadow rounded overflow-hidden hover:shadow-lg transition">
  <Link to={`/product/${shoe.id}`}>
    <img
      src={shoe.img}
      alt={shoe.name}
      className="w-full h-96 object-cover"
    />
  </Link>
          <p className="mb-2">₹{shoe.price}</p>
          <button
            onClick={() => dispatch(addToCart(shoe))}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
