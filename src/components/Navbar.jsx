import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { totalQuantity } = useSelector(state => state.cart);

  return (
    <nav className="flex justify-between items-center p-4 absolute top-0 left-0 w-full bg-indigo-950 text-white z-10 ">
      <Link to="/" className="text-xl font-bold">AUVREX</Link>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart" className="relative">
          🛒
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 py-0.5 rounded-full">
              {totalQuantity}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
