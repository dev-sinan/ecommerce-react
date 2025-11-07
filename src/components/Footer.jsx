import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-8">
        
        
        
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">AUVREX 👟</h2>
          <p className="text-sm">
            Step into style and comfort. Explore our latest collection of trendy shoes made for everyone.
          </p>
        </div>



        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/products" className="hover:text-white transition">Products</a></li>
            <li><a href="/cart" className="hover:text-white transition">Cart</a></li>
          </ul>
        </div>

        

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Stay Connected</h3>
          <p className="text-sm mb-3">Subscribe for updates and offers!</p>
          
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-lg text-gray-150 outline-none"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-r-lg text-white hover:bg-blue-700 transition">
              Subscribe
            </button>
          </div>

      


          <div className="flex space-x-5 mt-4 text-2xl">
            <a href="#" className="hover:text-blue-500 transition"><FaFacebook /></a>
            <a href="#" className="hover:text-pink-500 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-sky-400 transition"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} AUVREX. All rights reserved.
      </div>
    </footer>
  );
}
