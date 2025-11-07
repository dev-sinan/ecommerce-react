export default function Testimonials() {
  const reviews = [
    {
      name: "SINAN",
      text: "Amazing experience! The quality is top-notch and the overall service felt very premium.",
    },
    {
      name: "ASHMIL",
      text: "Everything was perfect — smooth process, fast delivery, and really impressive attention to detail.",
    },
    {
      name: "RASHAD",
      text: "Loved the products! Great quality, premium packaging, and excellent customer support.",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300"
            >
              <p className="text-gray-700 italic mb-3">“{r.text}”</p>
              <h4 className="font-semibold text-gray-900">{r.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
