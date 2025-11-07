import { useNavigate } from "react-router-dom";

export default function AboutSection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center px-6 md:px-8 ">
        

        <div className="md:w-1/2">
          <img
            src="/about.png"
            alt="About AUVREX"
            className="rounded-b-full shadow-lg w-96 object-cover"
          />
        </div>

        
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About AUVREX</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            At <span className="font-semibold">AUVREX</span>, we believe every
            step should be a statement...
          </p>
          <button
            onClick={() => navigate("/about")}
            className="bg-black text-white px-6 py-2 rounded-full hover:scale-105 transition-transform"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
