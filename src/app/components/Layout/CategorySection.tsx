import ProductCategory from "./ProductCategory";

const CategorySection = () => {
  return (
    <div className="container max-w-[1440px] flex flex-col justify-center items-center px-5 gap-y-10 my-15 mx-auto">
      <h1 className="px-10 text-4xl font-semibold italic">
        หมวดหมู่สินค้า
      </h1>
      <div className="flex flex-wrap justify-center items-center gap-5 w-full h-auto ">
        <ProductCategory />
        <ProductCategory />
        <ProductCategory />
        <ProductCategory />
        <ProductCategory />  
      </div>
    </div>
  );
};
export default CategorySection;
