import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCartItem } from "../features/cart/cartSlice";
import { Search } from "lucide-react";
import { toast } from "react-toastify";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortOption, setSortOption] = useState("default");
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { category } = useParams();


  const token = localStorage.getItem("token");

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        if (res.ok && data.products) {
          const formatted = data.products.map((p) => ({
            ...p,
            size:
              typeof p.size === "string"
                ? p.size.split(",").map((s) => s.trim())
                : Array.isArray(p.size)
                ? p.size
                : [],
          }));
          setProducts(formatted);
        } else {
          console.error("Invalid response:", data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchProducts();
  }, []);

  // Filter + Sort
  const filteredItems = (category
    ? products.filter(
        (item) => item.category?.toLowerCase() === category.toLowerCase()
      )
    : products
  )
    .filter((item) => item.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((item) => item.price <= maxPrice);

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOption === "lowToHigh") return a.price - b.price;
    if (sortOption === "highToLow") return b.price - a.price;
    return 0;
  });

  // Navigate to product details
  const handleGoToDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Add to cart (with login check)
  const handleOpenModal = (product) => {
    // 🔥 FINAL FIX → login check using ONLY localStorage token
    if (!token) {
      toast.warn("Please login first to add products to cart 🛒", {
        position: "top-center",
        autoClose: 2000,
      });

      localStorage.setItem("redirectAfterLogin", window.location.pathname);

      setTimeout(() => navigate("/login"), 1500);
      return; // STOP — do not open modal
    }

    // If logged in → open modal or add directly
    const validSizes = Array.isArray(product.size)
      ? product.size.filter((s) => s && s.trim() !== "")
      : [];

    if (validSizes.length > 0) {
      setSelectedProduct({ ...product, size: validSizes });
      setSelectedSize(validSizes[0]);
    } else {
      const itemToAdd = {
        id: product._id,
        name: product.name,
        price: product.price,
        img: product.image,
        size: "N/A",
        quantity: 1,
      };
      dispatch(addCartItem(itemToAdd));
      toast.success("Product added to cart 🛒", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  // Add to cart from modal
  const handleAddToCart = () => {
    if (!token) {
      toast.warn("Please login first to add products to cart 🛒", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    if (!selectedProduct) return;

    const itemToAdd = {
      id: selectedProduct._id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      img: selectedProduct.image,
      size: selectedSize || "N/A",
      quantity: 1,
    };

    dispatch(addCartItem(itemToAdd));
    setSelectedProduct(null);

    toast.success("Product added to cart 🛒", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  // Buy now
  const handleBuyNow = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setMaxPrice(5000);
    setSortOption("default");
  };

  return (
    <div className="p-6">

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-500 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <label className="text-sm font-semibold text-gray-600 mb-1">
            Max Price: ₹{maxPrice}
          </label>
          <input
            type="range"
            min="250"
            max="10000"
            step="200"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-40 cursor-pointer accent-black"
          />
        </div>

        <div className="flex gap-3 items-center">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-full px-3 py-2 focus:ring-2 focus:ring-black"
          >
            <option value="default">Sort By</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>

          <button
            onClick={handleResetFilters}
            className="text-sm border border-gray-400 rounded-full px-3 py-2 hover:bg-gray-100"
          >
            Reset
          </button>
        </div>
      </div>

      <p className="text-gray-500 text-sm text-center mb-4">
        {category ? category.toUpperCase() : "ALL PRODUCTS"}
      </p>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {sortedItems.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 flex flex-col items-center"
          >
            <img
              onClick={() => handleGoToDetails(item._id)}
              src={item.image}
              alt={item.name}
              className="w-full h-[300px] object-cover cursor-pointer"
            />

            <div className="p-4 text-center flex flex-col items-center">
              <h2 className="text-lg font-bold mb-1">{item.name}</h2>
              <p className="text-gray-600 mb-3 text-lg font-semibold">
                ₹{item.price}
              </p>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleOpenModal(item)}
                  className="bg-black text-white w-32 py-2 rounded-full transition-transform hover:scale-105"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => handleBuyNow(item._id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black w-32 py-2 rounded-full transition-transform hover:scale-105"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}

        {sortedItems.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            No items found 😕
          </p>
        )}
      </div>

      {/* Size Modal - Only show if LOGGED IN */}
      {selectedProduct && token && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] sm:w-[450px] relative border border-gray-200">
            <div className="flex items-center gap-4 border-b pb-3 mb-3">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-20 h-20 rounded object-cover"
              />
              <div>
                <h2 className="font-bold text-lg">{selectedProduct.name}</h2>
                <p className="text-sm text-gray-600">
                  ₹{selectedProduct.price}
                </p>
              </div>
            </div>

            {Array.isArray(selectedProduct.size) &&
              selectedProduct.size.length > 0 && (
                <div className="mb-4">
                  <p className="font-semibold mb-2">Select Size:</p>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black"
                  >
                    {selectedProduct.size.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              )}

            <p className="text-sm text-green-600 font-bold mb-4">
              Free Delivery 🚚
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedProduct(null)}
                className="border px-4 py-2 rounded-full hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleAddToCart}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

  {/* ToastContainer is mounted once in main.jsx */}
    </div>
  );
}
