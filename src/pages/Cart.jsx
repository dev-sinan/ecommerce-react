import { useSelector, useDispatch } from "react-redux";
import { addToCart, decreaseQuantity, removeFromCart } from "../features/cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalItems = useSelector(state => state.cart.totalItems);
  const totalPrice = useSelector(state => state.cart.totalPrice);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-700">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cartItems.map(item => (
            <div key={item.id} className="bg-white shadow rounded p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded"/>
                <div>
                  <h2 className="font-bold">{item.name}</h2>
                  <p>₹{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => dispatch(addToCart(item))}
                  className="bg-green-500 hover:bg-green-600 font-bold px-3 py-1 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="bg-yellow-300 hover:bg-yellow-600 font-bold px-3 py-1 rounded"
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
      )}

      {cartItems.length > 0 && (
        <div className="mt-6 text-right">
          <p className="text-lg font-bold">Total Items: {totalItems}</p>
          <p className="text-lg font-bold">Total Price: ₹{totalPrice}</p>
        </div>
      )}
    </div>
  );
}
