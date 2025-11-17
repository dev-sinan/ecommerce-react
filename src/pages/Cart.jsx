import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  addCartItem,
  decreaseCartItem,
  removeCartItem,
  clearCartFromServer,
} from "../features/cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const { items = [], totalItems = 0, totalPrice = 0, loading, error } =
    useSelector((state) => state.cart);

  //  Fetch cart on mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  //  Safe image handler
  const getImageUrl = (item) => {
    if (!item) return "https://via.placeholder.com/150?text=No+Image";
    const img = item.img || item.image || item.images || null;
    if (!img) return "https://via.placeholder.com/150?text=No+Image";
    if (typeof img === "string" && img.startsWith("http")) return img;
    if (typeof img === "object" && img.url) return img.url;
    if (Array.isArray(img) && img.length > 0) {
      if (typeof img[0] === "string") return img[0];
      if (img[0].url) return img[0].url;
    }
    return "https://via.placeholder.com/150?text=No+Image";
  };

  //  Handle checkout
  const handleCheckout = () => {
    const phoneNumber = "919526539251";
    let message = "🛍️ *New Order Details:*\n\n";

    items.forEach((item) => {
      message += `🛒 *${item.name}*\n`;
      if (item.size) message += `📏 Size: ${item.size}\n`;
      message += `💰 Price: ₹${item.price}\n`;
      message += `📦 Qty: ${item.quantity}\n`;
      message += `🖼️ Image: ${getImageUrl(item)}\n`;
      message += `—————————————\n`;
    });

    message += `\n🧾 *Total Items:* ${totalItems}\n💸 *Total Price:* ₹${totalPrice}\n✅ Confirm my order`;

    const encoded = encodeURIComponent(message);
    window.open(
      `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encoded}`,
      "_blank"
    );

    dispatch(clearCartFromServer());
  };

  //  Handle loading or error states
  if (loading)
    return (
      <div className="p-10 text-center text-gray-600 text-xl">
        ⏳ Loading your cart...
      </div>
    );

  if (error)
    return (
      <div className="p-10 text-center text-red-600 text-xl">
        ❌ Error loading cart: {error}
      </div>
    );

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      {!items || items.length === 0 ? (
        <p className="text-gray-700 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div
                key={`${item.id}_${item.size || "N/A"}`}
                className="bg-white shadow rounded p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={getImageUrl(item)}
                    alt={item.name || "Item"}
                    className="w-20 h-20 object-cover rounded"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/150?text=No+Image")
                    }
                  />
                  <div>
                    <h2 className="font-bold">{item.name || "Unnamed"}</h2>
                    {item.size && (
                      <p className="text-sm text-gray-500">
                        Size: {item.size}
                      </p>
                    )}
                    <p>₹{item.price || 0}</p>
                    <p>Quantity: {item.quantity || 1}</p>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => dispatch(addCartItem(item))}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold px-3 py-1 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      dispatch(decreaseCartItem({ id: item.id, size: item.size }))
                    }
                    className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-3 py-1 rounded"
                  >
                    -
                  </button>
                  <button
                    onClick={() =>
                      dispatch(removeCartItem({ id: item.id, size: item.size }))
                    }
                    className="bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white p-4 rounded shadow text-right space-y-3">
            <p className="text-lg font-bold">Total Items: {totalItems}</p>
            <p className="text-lg font-bold">Total Price: ₹{totalPrice}</p>

            <button
              onClick={handleCheckout}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-lg font-semibold"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
