import Banner from "../components/Banner";
import Features from "../components/features";
import FeaturedProducts from "../components/featuredproducts";
import AboutSection from "../components/AboutSection";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <>
      <Banner />
      <Features/>
      <FeaturedProducts />
      <AboutSection/>
      <Testimonials/>
    </>
  );
}
