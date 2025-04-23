
import CategorySection from "./components/Layout/CategorySection";
import DisclaimerSection from "./components/Layout/DisclaimerSection";
import LogoCarousel from "./components/Layout/LogoCarousel";
import MainSliderImg from "./components/Layout/MainSliderImg";
import NewAvirialsSection from "./components/Layout/NewAvirialsSection";
import VideoBanner from "./components/Layout/VideoBanner";

const HomePage = () => {
  return (
    <div>
      <MainSliderImg />
      <CategorySection/>
      <VideoBanner /> 
      <LogoCarousel/>
      <NewAvirialsSection/>
      <DisclaimerSection/>
     
    </div>
  );
};
export default HomePage;
