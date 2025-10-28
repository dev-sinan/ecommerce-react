// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../features/cart/cartSlice";
// import { shoes } from "../data/shoes";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const product = shoes.find(item => item.id === parseInt(id));

//   if (!product) {
//     return <h2 className="text-center mt-10 text-xl font-semibold">Product not found</h2>;
//   }

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row items-center justify-center p-6 gap-10">
//       <img
//         src={product.img}
//         alt={product.name}
//         className="w-full h-80 md:w-96 md:h-96 object-cover rounded-xl shadow-lg"
//       />

//       <div className="max-w-md space-y-4">
//         <h1 className="text-3xl font-bold">{product.name}</h1>
//         <p className="text-gray-600 text-lg">Price: ₹{product.price}</p>
//         <p className="text-gray-500">
//           High-quality, stylish and comfortable — perfect for your daily wear!
//         </p>

//         <div className="flex gap-4 pt-4">
//           <button
//             onClick={() => dispatch(addToCart(product))}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
//           >
//             Add to Cart
//           </button>

//           <button
//             onClick={() => alert("Proceeding to Buy Now...")}
//             className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
//           >
//             Buy Now
//           </button>
//         </div>

//         <button
//           onClick={() => navigate(-1)}
//           className="mt-6 underline text-blue-600 hover:text-blue-800"
//         >
//           ← Back to Products
//         </button>
//       </div>
//     </div>
//   );
// }


import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { shoes } from "../data/shoes";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = shoes.find(item => item.id === parseInt(id));

  if (!product) {
    return (
      <h2 className="text-center mt-10 text-xl font-semibold">
        Product not found
      </h2>
    );
  }

// whatsapp order
  const handleBuyNow = () => {
    const phoneNumber = "919526539251"; 
    const message = `Hi! I would like to order *${product.name}* priced at ₹${product.price}.
    
🖼️ Product image: ${window.location.origin}${product.img}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.location.href = whatsappUrl; 
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
        

          <div className="w-full">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>


          <div className="space-y-5 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
            <p className="text-gray-700 text-lg">₹{product.price}</p>

            <p className="text-gray-500">
              Step up your style with the {product.name}. Perfect comfort and
              premium quality crafted for your daily look.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <button
                onClick={() => dispatch(addToCart(product))}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full"
              >
                Buy Now
              </button>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="mt-4 underline text-blue-600 hover:text-blue-800 block"
            >
              ← Back to Products
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
