import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Banner() {
  const navigate = useNavigate();
  return (

<div className="bg-[url('/src/banner.jpg')] bg-no-repeat bg-center bg-cover text-shadow-black text-center flex flex-col justify-center items-center h-auto md:h-[400px] lg:h-[600px] px-4 pt-45 pl-0  md:pr-[550px] md:bg-">
<div className="pb-20 flex flex-col justify-start left-0" >
  <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold lg:pr-[250px] pr-20 lg:mb-4">
    Step Into Style 
  </h1>
  <p className=" sm:text-2xl md:text-2xl  lg:pr-[200px] pr-[120px] lg:mb-4">
    Discover the latest trends in sneakers.
  </p>

<div className="flex justify-center pr-32">
  <button
          onClick={() => navigate("/products")}
          className="bg-black  text-white font-semibold px-4 lg:px-8 py-1.5 lg:py-3.5  rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
          Shop Now
        </button>
          </div>
    </div>
</div>
  );
}
