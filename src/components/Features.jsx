

export default function Features() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Why Choose Us
        </h2>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          


          <div className="bg-white p-6 rounded-2xl shadow-md text-center transition-transform">
            <img
              src="/delivery.jpg"
              alt="Fast Delivery"
              className="w-50 h-50 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-700">
              Get your products delivered to your doorstep quickly and safely.
            </p>
          </div>

          

          <div className="bg-white p-6 rounded-2xl shadow-md text-center  transition-transform">
            <img
              src="/quality1.jpg"
              alt="Quality Shoes"
              className="w-70 h-50 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Quality </h3>
            <p className="text-gray-700">
              We bring you the best brands with top-notch materials.
            </p>
          </div>

          

          <div className="bg-white p-6 rounded-2xl shadow-md text-center transition-transform">
            <img
              src="/affordableprice.jpg"
              alt="Affordable Prices"
              className="w-50 h-50 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
            <p className="text-gray-700">
              Get the latest styles without breaking your budget.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
