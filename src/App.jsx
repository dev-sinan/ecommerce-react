import axios from "axios";
import { Routes, Route, Outlet } from "react-router-dom";
// ToastContainer and CSS are provided once in main.jsx

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import About from "./pages/About";
import AddProduct from "./pages/AddProduct";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <>
      {/* ToastContainer is mounted in main.jsx */}

      <div className="bg-gray-100 min-h-screen flex flex-col">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:category" element={<Products />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="about" element={<About />} />
              <Route path="addproducts" element={<AddProduct />} />

              {/*  Protected Routes */}
              <Route
                path="cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* 🔑 Auth Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* 🚫 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}

function Layout() {
  return <Outlet />;
}

function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen text-2xl font-semibold text-gray-700">
      404 | Page Not Found
    </div>
  );
}
