import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../features/cart/cartSlice";

export default function Cart() {
  const { cartItems, totalPrice, totalQuantity } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty 🛒</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between border-b pb-4">
              <img src={item.img} alt={item.name} className="w-20 h-20 object-cover" />
              <div className="flex-1 px-4">
                <h2 className="font-semibold">{item.name}</h2>
                <p>${item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => dispatch(decreaseQuantity(item.id))} className="px-2 bg-gray-300 rounded">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(increaseQuantity(item.id))} className="px-2 bg-gray-300 rounded">+</button>
                </div>
              </div>
              <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-500">Remove</button>
            </div>
          ))}

          <div className="text-right mt-6 font-semibold">
            <p>Total Items: {totalQuantity}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
