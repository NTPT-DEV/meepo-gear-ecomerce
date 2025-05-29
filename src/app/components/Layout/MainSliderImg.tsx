"use client";
import Image from "next/image";
import { bannerIMG } from "@/utils/image-data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation , Pagination } from "swiper/modules"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MainSliderImg = () => {
  return (
    <div className="container flex justify-center items-center max-w-[1440px] h-auto my-5 mx-auto">
      <div className="flex items-center justify-center w-full h-auto bg-red-600 rounded-3xl mx-4 overflow-hidden">
        <Swiper 
        modules={[Autoplay, Navigation , Pagination]}
        pagination={{ clickable: true }}
        loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        className="flex justify-center items-center w-full h-auto"
        >
          {bannerIMG.map((item, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center">
              <Image
                src={item.src}
                width={1920}
                height={1920}
                alt={item.alt}
                className="object-cover w-full h-full  "
                priority
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default MainSliderImg;
