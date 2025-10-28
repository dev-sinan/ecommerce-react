// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Footer from "./components/footer";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
