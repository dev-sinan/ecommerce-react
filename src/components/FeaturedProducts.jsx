import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FeaturedProducts() {
  const navigate = useNavigate();
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();

  

    //  Check if backend returns 
    const productsArray = Array.isArray(data)
      ? data
      : data.products || [];

    //  4 featured product IDs
    const favoriteItemIds = [
      "69098ff135c3b80d7fffe721",
      "6909c7c698b0b9c9349e7492",
      "6909ca5f98b0b9c9349e74c3",
      "69097ea225bd82c8164ac57a"
    ];

    //  Filter featured products
    const filtered = productsArray.filter((item) =>
      favoriteItemIds.includes(item._id)
    );

    setFeaturedItems(filtered);
  } catch (error) {
    console.error("Error fetching featured products:", error);
  }
};

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Featured Products
        </h2>

        {featuredItems.length === 0 ? (
          <p className="text-center text-gray-500">No featured products yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
            {featuredItems.map((product) => (
              <div
                key={product._id}
                className="border rounded-2xl shadow-md bg-gray-50 hover:shadow-lg transition-transform"
              >
                <img
                  src={product.image} // 🔹 use "image" or whatever field name your backend uses
                  alt={product.name}
                  className="rounded-t-2xl w-full h-56 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                  <p className="text-gray-600 mb-3">₹{product.price}</p>

                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
                  >
                    Buy Now
                  </button>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
