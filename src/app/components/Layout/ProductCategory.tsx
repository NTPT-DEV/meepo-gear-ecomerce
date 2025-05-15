"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";

const ProductCategory = () => {
  interface CategoryType {
    id: string;
    name: string;
    categoryImage: {
      secure_url: string;
    }[];
  }

  const [categoryData, setCategoryData] = useState<CategoryType[]>([]);
  const [dragLeftLimit, setDragLeftLimit] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);


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


  // Calc width for Drag category 
  useEffect(() => {
    const updateDragConstraints = () => {
      if (!containerRef.current) return;

      const scrollWidth = containerRef.current.scrollWidth; //viewport of scroll
      const clientWidth = containerRef.current.clientWidth; //viewport of client
      const maxDragLeft = clientWidth - scrollWidth;

      // console.log(scrollWidth, clientWidth);

      setDragLeftLimit(maxDragLeft < 0 ? maxDragLeft : 0);
    };

    updateDragConstraints();

    window.addEventListener("resize", updateDragConstraints);

    return () => {
      window.removeEventListener("resize", updateDragConstraints);
    };
  }, [categoryData]);



  return (
    <motion.div
      ref={containerRef}
      drag="x"
      dragConstraints={{ left: dragLeftLimit, right: 0 }}
      whileTap={{ cursor: "grabbing" }}
      dragListener={true}
      className="flex justify-start items-center gap-5 w-full h-full whitespace-nowrap scroll-smooth touch-pan-x"
    >
      {categoryData.map((item, index) => (
        <Link draggable={false} key={index} href={`/product`}>
          <div className="hover:scale-105 transition-all duration-200 cursor-pointer">
            <div className="flex flex-col justify-center items-center gap-5">
              <div
                key={item.id}
                className="flex flex-col min-w-[200px] h-auto bg-white justify-center items-center rounded-3xl
                         shadow-sm p-2 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {item.categoryImage.map((img, index) => (
                  <Image
                    draggable={false}
                    key={index}
                    src={img.secure_url}
                    alt=""
                    width={500}
                    height={500}
                    className="object-cover hover:scale-110 transition-transform duration-300 p-4"
                  />
                ))}
              </div>
              <h1 className="text-2xl font-bold">{item.name.toUpperCase()}</h1>
            </div>
          </div>
        </Link>
      ))}
    </motion.div>
  );
};
export default ProductCategory;
