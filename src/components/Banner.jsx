
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="bg-gray-800 text-white text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Step Into Style 👟</h1>
      <p className="mb-6">Discover the latest trends in sneakers.</p>
      <Link to="/products" className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600">
        Shop Now
      </Link>
    </div>
  );
}
