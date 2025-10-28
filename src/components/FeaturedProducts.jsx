
import { shoes } from "../data/shoes";
import { useNavigate } from "react-router-dom";

export default function FeaturedProducts() {
  const navigate = useNavigate();

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {shoes.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="border rounded-2xl shadow-md bg-gray-50 hover:shadow-lg transition-transform"
            >
              <img
                src={product.img}
                alt={product.name}
                className="rounded-t-2xl w-full h-56 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                <p className="text-gray-600 mb-3">₹{product.price}</p>

                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
