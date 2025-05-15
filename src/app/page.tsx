import CategorySection from "./components/Layout/CategorySection";
import DisclaimerSection from "./components/Layout/DisclaimerSection";
import Footer from "./components/Layout/Footer";
import LogoCarousel from "./components/Layout/LogoCarousel";
import MainSliderImg from "./components/Layout/MainSliderImg";
import Navbar from "./components/Layout/Navbar";
import NewAvirialsSection from "./components/Layout/NewAvirialsSection";
import VideoBanner from "./components/Layout/VideoBanner";


const HomePage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen gap-y-5">
      <Navbar />
      <MainSliderImg />
      <CategorySection />
      <VideoBanner />
      <LogoCarousel />
      <NewAvirialsSection />
      <DisclaimerSection />
      <Footer />
    </div>
  );
};
export default HomePage;
