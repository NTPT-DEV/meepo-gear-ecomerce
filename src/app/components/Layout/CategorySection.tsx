"use client";
import ProductCategory from "./ProductCategory";

const CategorySection = () => {
  return (
    <div className="container max-w-[1440px] h-auto flex flex-col justify-center items-center px-5 gap-y-10 my-15 mx-auto">
      <h1 className="px-10 text-4xl font-semibold italic">หมวดหมู่สินค้า</h1>
      <div className="overflow-hidden w-full h-auto mx-auto">
        <div className="">
          <ProductCategory />
        </div>
      </div>
    </div>
  );
};
export default CategorySection;
