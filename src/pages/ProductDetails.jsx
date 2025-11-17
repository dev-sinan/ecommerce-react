import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCartItem } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [showSizeBox, setShowSizeBox] = useState(false);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();

        if (res.ok && data.product) {
          let sizesArray = [];

          if (typeof data.product.size === "string") {
            sizesArray = data.product.size
              .split(/[, ]+/)
              .map((s) => s.trim())
              .filter(Boolean);
          } else if (Array.isArray(data.product.size)) {
            sizesArray = data.product.size.filter((s) => s && s.trim() !== "");
          }

          setProduct({ ...data.product, sizes: sizesArray });
        } else {
          console.error("Failed to load product:", data.message);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  // Auto-select first size if available
  useEffect(() => {
    if (product?.sizes?.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <h2 className="text-center mt-10 text-xl font-semibold">
        Product not found
      </h2>
    );
  }

  // Quantity control
  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => quantity > 1 && setQuantity((q) => q - 1);

  // Add to Cart button click (login check)
  const handleAddToCartClick = () => {
    const token = localStorage.getItem("token");

    // 🔐 Check if user is logged in
    if (!token) {
      toast.warn("Please login first to add products to cart 🛒", {
        position: "top-center",
        autoClose: 2000,
      });
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    // If logged in
    if (product.sizes && product.sizes.length > 0) {
      setShowSizeBox(true);
    } else {
      const itemToAdd = {
        id: product._id,
        name: product.name,
        price: product.price,
        img: product.image,
        size: "N/A",
        quantity,
      };

      dispatch(addCartItem(itemToAdd));
      toast.success("Product added to cart 🛒", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  // Confirm Add to Cart (with or without size)
  const handleConfirmAddToCart = () => {
    const token = localStorage.getItem("token");

    // 🔐 Login check again (safety)
    if (!token) {
      toast.warn("Please login first to add products to cart 🛒", {
        position: "top-center",
        autoClose: 2000,
      });
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    const itemToAdd = {
      id: product._id,
      name: product.name,
      price: product.price,
      img: product.image,
      size: selectedSize || "N/A",
      quantity,
    };

    dispatch(addCartItem(itemToAdd));
    setShowSizeBox(false);
    toast.success("Product added to cart 🛒", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  // WhatsApp Buy Now (no login required)
  const handleBuyNow = () => {
    const phoneNumber = "919526539251";
    const total = product.price * quantity;
    const message = `🛍️ *Order Details:*\n\nProduct: *${product.name}*${
      selectedSize ? `\nSize: ${selectedSize}` : ""
    }\nPrice: ₹${product.price}\nQuantity: ${quantity}\nTotal: ₹${total}\n\n🖼️ Image: ${product.image}`;
    window.location.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <section className="py-12 bg-white relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Product Image */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[430px] object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-5 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>
            <p className="text-gray-700 text-xl font-semibold">
              ₹{product.price}
            </p>
            <p className="text-gray-500 leading-relaxed">
              Step up your style with the <b>{product.name}</b>. Designed for
              comfort, quality, and the modern AUVREX look.
            </p>

            {/* Size Selector */}
            {product.sizes?.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold mb-2">Select Size:</p>
                <div className="flex gap-2 flex-wrap justify-center md:justify-start">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full border transition-all ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-gray-400 hover:bg-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Control */}
            <div className="flex justify-center md:justify-start items-center gap-4 mt-4">
              <button
                onClick={handleDecrease}
                className="bg-gray-300 px-3 py-1 rounded-full hover:bg-gray-400"
              >
                −
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="bg-gray-300 px-3 py-1 rounded-full hover:bg-gray-400"
              >
                +
              </button>
            </div>

            <p>Free Delivery</p>
            <div className="text-lg font-semibold text-gray-800 mt-2">
              Total: ₹{product.price * quantity}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <button
                onClick={handleAddToCartClick}
                className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full transition-transform hover:scale-105"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-full transition-transform hover:scale-105"
              >
                Buy Now
              </button>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="mt-6 text-blue-600 hover:text-blue-800 text-sm"
            >
              ← Back to Products
            </button>
          </div>
        </div>
      </div>

      {/* Size Popup */}
      {showSizeBox && product.sizes && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] sm:w-[450px] relative border border-gray-200">
            <div className="flex items-center gap-4 border-b pb-3 mb-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 rounded object-cover"
              />
              <div>
                <h2 className="font-bold text-lg">{product.name}</h2>
                <p className="text-sm text-gray-600">
                  ₹{product.price}{" "}
                  <span className="text-red-600 line-through text-xs ml-2">
                    ₹{product.price + 200}
                  </span>
                </p>
              </div>
            </div>

            <div className="mb-4">
              <p className="font-semibold mb-2">Select Size (optional):</p>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black"
              >
                <option value="">No size selected</option>
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm font-bold text-green-600 mb-4">
              <p>Free Delivery 🚚</p>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowSizeBox(false)}
                className="border px-4 py-2 rounded-full hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAddToCart}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

  {/* ToastContainer is mounted once in main.jsx */}
    </section>
  );
}
