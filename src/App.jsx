import axios from "axios";
import { Routes, Route, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import About from "./pages/About";
import AddProduct from "./pages/AddProduct";

axios.defaults.baseURL = "http://localhost:5000";

export default function App() {
  const [backendMessage, setBackendMessage] = useState("");

  useEffect(() => {
    axios
      .get("/")
      .then((res) => setBackendMessage(res.data))
      .catch((err) => console.log("❌ Backend Error:", err));
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="bg-gray-100 min-h-screen flex flex-col">
            <Navbar />

            <main>
              <Outlet />
            </main>

            <Footer />
          </div>
        }>      
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:category" element={<Products />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="about" element={<About />} />
        <Route path="addproducts" element={<AddProduct />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

