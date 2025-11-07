import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Navbar() {
  const totalItems = useSelector((state) => state.cart.totalItems);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-[#D0CFCF] px-4 py-3 sticky left-0 top-0 w-full z-50">
      <div className="flex items-center justify-between">

        {/* --- Logo + Name --- */}
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="lg:w-16 lg:h-14 w-11 h-11 object-cover rounded-full cursor-pointer"
            />
          </Link>
          <h1 className="text-2xl lg:text-3xl font-bold">AUVREX</h1>
        </div>

        {/* --- Desktop Menu --- */}
        <ul className="hidden md:flex items-center space-x-6">
          <li>
            <Link to="/" className="hover:text-blue-400 lg:text-2xl">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-blue-400 lg:text-2xl">
              Products
            </Link>
          </li>
          <li>
  <Link to="/products/shoes" className="hover:text-blue-400 lg:text-2xl">
    Shoes
  </Link>
</li>
<li>
  <Link to="/products/watches" className="hover:text-blue-400 lg:text-2xl">
    Watches
  </Link>
</li>

<li>
  <Link to="/products/glasses" className="hover:text-blue-400 lg:text-2xl">
    Specs
  </Link>
</li>
        </ul>

        {/* --- Cart & Mobile Toggle --- */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Link to="/cart" className="text-2xl hover:text-blue-400 lg:text-2xl">
             🛒
            </Link>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {totalItems}
              </span>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      {isOpen && (
  <ul className="flex flex-col mt-3 space-y-3 md:hidden">
    <li>
      <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-blue-400">
        Home
      </Link>
    </li>
    <li>
      <Link to="/products" onClick={() => setIsOpen(false)} className="block hover:text-blue-400">
        Products
      </Link>
    </li>
    <li>
      <Link to="/products/shoes" onClick={() => setIsOpen(false)} className="block hover:text-blue-400">
        Shoes
      </Link>
    </li>
    <li>
      <Link to="/products/watches" onClick={() => setIsOpen(false)} className="block hover:text-blue-400">
        Watches
      </Link>
    </li>
    <li>
      <Link to="/products/glasses" onClick={() => setIsOpen(false)} className="block hover:text-blue-400">
        Specs
      </Link>
    </li>
  </ul>
)}
    </nav>
  );
}
