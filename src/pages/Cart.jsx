import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../features/cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const handleCheckout = () => {
    const phoneNumber = "919526539251"; // change to your WhatsApp number

    let message = "🛍️ *New Order Details:*\n\n";
    cartItems.forEach((item) => {
      message += `👟 *${item.name}*\n`;
      if (item.size) message += `📏 Size: ${item.size}\n`;
      message += `💰 Price: ₹${item.price}\n`;
      message += `📦 Quantity: ${item.quantity}\n`;
      message += `🖼️ Image: ${item.image}\n`; // ✅ fixed image field
      message += `—————————————\n`;
    });

    message += `\n🧾 *Total Items:* ${totalItems}\n💸 *Total Price:* ₹${totalPrice}\n\nPlease confirm my order ✅`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank"); // ✅ open new tab safely
    dispatch(clearCart());
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-700">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id + (item.size || "")}
                className="bg-white shadow rounded p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image} // ✅ fixed here
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-bold">{item.name}</h2>
                    <p>₹{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    {item.size && (
                      <p className="text-gray-600">Size: {item.size}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => dispatch(addToCart(item))}
                    className="bg-green-500 hover:bg-green-600 font-bold px-3 py-1 rounded text-white"
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="bg-yellow-400 hover:bg-yellow-500 font-bold px-3 py-1 rounded"
                  >
                    -
                  </button>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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
