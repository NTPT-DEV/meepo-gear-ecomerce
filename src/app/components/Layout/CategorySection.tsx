"use client";
import ProductCategory from "./ProductCategory";

const CategorySection = () => {
  return (
    <div className="container max-w-[1440px] h-auto flex flex-col justify-center items-center px-5 gap-y-10 mb-5 mx-auto">
      <h1 className="px-10 py-3 rounded-full min-w-1/3 text-4xl text-center font-semibold italic bg-black text-lime-300">หมวดหมู่สินค้า</h1>
      <div className="overflow-hidden w-full h-auto mx-auto">
        <div className="">
          <ProductCategory />
        </div>
      </div>
    </div>
  );
};
export default CategorySection;
