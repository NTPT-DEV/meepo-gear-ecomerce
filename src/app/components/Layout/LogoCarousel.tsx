"use client";

import Image from "next/image";
import { logoBrand } from "@/utils/image-data";
import {Autoplay , FreeMode} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react' 
import { motion } from "motion/react"


const LogoCarousel= () => {
  return (
    <div className=" flex flex-col justify-center items-center gap-10 w-[1440px] mx-auto px-4 my-20 overflow-hidden">
     
      {/* Slide TOP */}
        <motion.div 
        initial = {{opacity : 0 , y : 5}}
        whileInView={{opacity : 1 , y : 0}}
        viewport={{once : true}}
        transition={{duration : 0.5 , delay : 0.5}}
        className="flex justify-start items-center gap-5">
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
        </motion.div>
      {/* Slide BOTTOM */}
        <motion.div 
        initial = {{opacity : 0 , y : 5}}
        whileInView={{opacity : 1 , y : 0}}
        viewport={{once : true}}
        transition={{duration : 0.5 , delay : 0.8}}
        className="flex justify-end items-center gap-5">
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
        </motion.div>
    </div>
  )
}
export default LogoCarousel