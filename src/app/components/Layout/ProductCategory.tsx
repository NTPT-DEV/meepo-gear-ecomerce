"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import { motion } from "motion/react";

const ProductCategory = () => {
  interface CategoryType {
    id: string;
    name: string;
    categoryImage: {
      secure_url: string;
    }[];
  }

  const [categoryData, setCategoryData] = useState<CategoryType[]>([]);

  /// getAllCategory
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const getAll = await axios.get("/api/category");
        if (!getAll) {
          console.log("No Category Found");
        }
        setCategoryData(getAll.data.categories);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategory();
  }, []);


  return (
    <div className="flex justify-start items-center gap-5 w-full h-full whitespace-nowrap scroll-smooth touch-pan-x">
      <Swiper
        modules={[FreeMode]}
        slidesPerView="auto"
        spaceBetween={20}
        freeMode={true}
        loop={true}
      >
        {categoryData.map((item, index) => (
          <SwiperSlide key={index} className="!w-auto">
            <Link draggable={false} key={index} href={`/category/${item.id}`}>
              <div className="hover:scale-105 transition-all duration-200 cursor-pointer">
                <div className="flex flex-col justify-center items-center gap-5">
                  <div
                    key={item.id}
                    className="flex flex-col max-w-[200px] max-sm:w-[150px] h-auto bg-white justify-center items-center rounded-3xl
                         shadow-sm p-2 hover:shadow-md transition-all duration-200 overflow-hidden"
                  >
                    {item.categoryImage.map((img, index) => (
                      <Image
                        priority={true}
                        draggable={false}
                        key={index}
                        src={img.secure_url}
                        alt=""
                        width={500}
                        height={500}
                        className="object-cover hover:scale-110 transition-transform duration-300 p-4 w-50"
                      />
                    ))}
                  </div>
                  <h1 className="text-lg font-bold font-[Outfit] text-zinc-700">
                    {item.name.toUpperCase()}
                  </h1>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default ProductCategory;
