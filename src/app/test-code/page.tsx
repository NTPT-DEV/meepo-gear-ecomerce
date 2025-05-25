'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const page = () => {
  return (
    <div className="flex justify-center items-center w-screen h-auto bg-red-500 h-screen">
      <Swiper
        spaceBetween={2}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="w-[80vw] h-auto"
      >
        <SwiperSlide>
          <div className="bg-black w-96 h-96 hover:w-100 text-white flex justify-center items-cente">Slide 1</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-black w-96 h-96 text-white flex justify-center items-center">Slide 1</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-black w-96 h-96 text-white flex justify-center items-center">Slide 1</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-black w-96 h-96 text-white flex justify-center items-center">Slide 1</div>
        </SwiperSlide>
        
      </Swiper>
    </div>
  );
};
export default page;
