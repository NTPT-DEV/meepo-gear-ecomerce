"use client";
import { Blocks } from "lucide-react";
import ProductCategory from "./ProductCategory";
import { motion } from "motion/react";

const CategorySection = () => {
  return (
    <div className="container max-w-[1440px] h-auto flex flex-col justify-center items-center px-5 gap-y-10 mb-5 mx-auto">
      <div className="flex items-center justify-center gap-2 px-10 py-3 rounded-full min-w-1/3 text-4xl text-center font-semibold italic bg-black text-lime-300">
        หมวดหมู่สินค้า
        <span>
          <Blocks className="text-lime-300 w-7 h-7" />
        </span>
      </div>
      <div className="overflow-hidden w-full h-auto mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 , delay : 0.5 }}
        >
          <ProductCategory />
        </motion.div>
      </div>
    </div>
  );
};
export default CategorySection;
