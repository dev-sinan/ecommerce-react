import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { logout } from "../features/cart/user/userSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tokenFromState = useSelector((state) => state.user.token);
  
  const tokenFromStorage = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const token = tokenFromState || tokenFromStorage;
  const totalItems = useSelector((state) => state.cart.totalItems);

  const isLoggedIn = !!token;

  const [isOpen, setIsOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const userMenuRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout
  const handleLogoutClick = () => {
    setConfirmLogout(true);
    setUserMenu(false);
  };

  const confirmLogoutAction = () => {
    dispatch(logout());
    toast.info("👋 Logged out successfully", { autoClose: 1200 });
    setConfirmLogout(false);
    setTimeout(() => navigate("/login"), 1200);
  };

  const cancelLogoutAction = () => setConfirmLogout(false);

  // Cart click handling
  const handleCartClick = () => {
    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterLogin", "/cart");

      toast.warn("Please login to view your cart 🛒", {
        autoClose: 1000,
        theme: "colored",
      });

      setTimeout(() => navigate("/login"), 1200);
      return;
    }
    navigate("/cart");
  };

  return (
    <nav className="bg-black text-[#D0CFCF] px-4 py-3 sticky top-0 left-0 w-full z-50 shadow-md">
      <div className="flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="Auvrex Logo"
              className="lg:w-16 lg:h-16 w-10 h-10 object-contain"
            />
            <h1 className="text-2xl lg:text-3xl font-bold tracking-wide">
              AUVREX
            </h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6">
          <li><Link to="/" className="hover:text-blue-400 transition lg:text-2xl">Home</Link></li>
          <li><Link to="/products" className="hover:text-blue-400 transition lg:text-2xl">Products</Link></li>
          <li><Link to="/products/shoes" className="hover:text-blue-400 transition lg:text-2xl">Shoes</Link></li>
          <li><Link to="/products/watches" className="hover:text-blue-400 transition lg:text-2xl">Watches</Link></li>
          <li><Link to="/products/glasses" className="hover:text-blue-400 transition lg:text-2xl">Specs</Link></li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center space-x-4 relative">
          
          {/* Cart Icon */}
          <div className="relative">
            <button
              onClick={handleCartClick}
              className="text-2xl hover:text-blue-400 lg:text-2xl transition"
            >
              🛒
            </button>

            {/* SHOW COUNT ONLY IF LOGGED IN */}
            {isLoggedIn && totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {totalItems}
              </span>
            )}
          </div>

          {/* User Menu */}
          <div ref={userMenuRef} className="relative">
            <button
              onClick={() => setUserMenu(!userMenu)}
              className="hover:text-blue-400 transition"
            >
              <FaRegUserCircle size={28} color="#E5E5E5" />
            </button>

            {userMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2">

                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setUserMenu(false)}
                      className="block px-4 py-2 hover:bg-gray-700 transition"
                    >
                      Login
                    </Link>

                    <Link
                      to="/signup"
                      onClick={() => setUserMenu(false)}
                      className="block px-4 py-2 hover:bg-gray-700 transition"
                    >
                      Signup
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setUserMenu(false)}
                      className="block px-4 py-2 hover:bg-gray-700 transition"
                    >
                      My Account
                    </Link>

                    <button
                      onClick={handleLogoutClick}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700 transition"
                    >
                      ⬅️ Logout
                    </button>
                  </>
                )}

              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl focus:outline-none transition"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="flex flex-col mt-3 space-y-3 md:hidden bg-gray-900 rounded-lg p-4">
          <li><Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-blue-400">Home</Link></li>
          <li><Link to="/products" onClick={() => setIsOpen(false)} className="block hover:text-blue-400">Products</Link></li>
          <li><Link to="/products/shoes" onClick={() => setIsOpen(false)} className="block hover:text-blue-400">Shoes</Link></li>
          <li><Link to="/products/watches" onClick={() => setIsOpen(false)} className="block hover:text-blue-400">Watches</Link></li>
          <li><Link to="/products/glasses" onClick={() => setIsOpen(false)} className="block hover:text-blue-400">Specs</Link></li>
        </ul>
      )}

      {/* Logout Confirm Modal */}
      {confirmLogout && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to logout?
            </h3>

            <div className="flex justify-center gap-3">
              <button
                onClick={confirmLogoutAction}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Yes
              </button>

              <button
                onClick={cancelLogoutAction}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}
