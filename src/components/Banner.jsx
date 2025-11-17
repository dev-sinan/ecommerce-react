
import { useNavigate } from "react-router-dom";

export default function Banner() {
  const navigate = useNavigate();

  return (
    <div className="bg-[url('/src/banner.jpg')] bg-no-repeat bg-center bg-cover text-shadow-black text-center flex flex-col justify-center items-center h-auto md:h-[400px] lg:h-[520px] px-4  md:pt-45 md:pr-[550px]">
      <div className="pb-10 md:pb-20 flex flex-col pt-20 pr-15 justify-start md:items-start items-center text-white">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold lg:pr-[280px] text-black lg:mb-4">
          Step Into Style
        </h1>
        <p className="sm:text-2xl font-bold xl md:text-2xl lg:pr-[250px]  mb-3  font-mono lg:pl-20  text-black lg:mb-4">
          Discover the latest trends in sneakers.
        </p>

        <div className="flex justify-center md:justify-start mb-3 lg:pl-52">
          <button
            onClick={() => navigate("/products")}
            className="bg-black text-white  font-semibold px-4 lg:px-8 py-1.5 lg:py-3.5 lg:text-2xl rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}

