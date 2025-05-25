"use client";

import Image from "next/image";
import { logoBrand } from "@/utils/image-data";
import {Autoplay , FreeMode} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react' 



const LogoCarousel= () => {
  return (
    <div className=" flex flex-col justify-center items-center gap-10 w-[1440px] mx-auto px-4 my-20 overflow-hidden">
     
      {/* Slide TOP */}
        <div className="flex justify-start items-center gap-5">
         <Swiper 
         className="swiper-linear"
         modules={[Autoplay  , FreeMode]}
         loop={true}
         slidesPerView="auto"
         spaceBetween={300}
         freeMode={true}
         speed={50000}
         autoplay={{
          delay : 0 , 
          disableOnInteraction : false , 
         }}
         >
           <SwiperSlide >
             <div className="flex justify-center items-center w-auto gap-10" >
              { logoBrand.map((item , index) => (
                <Image key={index} src={item.src} alt={item.alt} width={200} height={100} className="w-24 h-12 opacity-50 hover:opacity-80 object-contain transition-all duration-200" />
              ))}
              </div>
            </SwiperSlide>
           <SwiperSlide >
             <div className="flex justify-center items-center w-auto gap-10" >
              { logoBrand.map((item , index) => (
                <Image key={index} src={item.src} alt={item.alt} width={200} height={100} className="w-24 h-12 opacity-50 hover:opacity-80 object-contain transition-all duration-200" />
              ))}
              </div>
            </SwiperSlide>
           
        </Swiper>
        </div>
      {/* Slide BOTTOM */}
        <div className="flex justify-end items-center gap-5">
         <Swiper 
         className="swiper-linear"
         modules={[Autoplay  , FreeMode]}
         loop={true}
         slidesPerView="auto"
         spaceBetween={300}
         freeMode={true}
         speed={50000}
          
         autoplay={{
          delay : 0 , 
          disableOnInteraction : false , 
          reverseDirection: true,
         }}
         >
           <SwiperSlide >
             <div className="flex justify-center items-center w-auto gap-10" >
              { logoBrand.map((item , index) => (
                <Image key={index} src={item.src} alt={item.alt} width={200} height={100} className="w-24 h-12 opacity-50 hover:opacity-80 object-contain transition-all duration-200" />
              ))}
              </div>
            </SwiperSlide>
           <SwiperSlide >
             <div className="flex justify-center items-center w-auto gap-10" >
              { logoBrand.map((item , index) => (
                <Image key={index} src={item.src} alt={item.alt} width={200} height={100} className="w-24 h-12 opacity-50 hover:opacity-80 object-contain transition-all duration-200" />
              ))}
              </div>
            </SwiperSlide>
           
        </Swiper>
        </div>
    </div>
  )
}
export default LogoCarousel