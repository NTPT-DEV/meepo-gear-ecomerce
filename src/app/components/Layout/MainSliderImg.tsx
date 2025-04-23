import Image from "next/image";

const MainSliderImg = () => {
  return (
    <div className="container flex justify-center items-center max-w-[1440px] mb-6 mx-auto">
      <div className="flex items-center justify-center w-full h-auto bg-red-600 rounded-3xl mx-4  overflow-hidden">
        <Image
          src={"/image/banner/Main-Banner-Silder-2.jpg"}
          width={2024}
          height={2024}
          alt="asus tuf gaming"
          className="object-cover w-full h-full animate-pulse "
        />
      </div>
    </div>
  );
};
export default MainSliderImg;
