import { Search } from "lucide-react";
import ProductList from "./ProductList";

const ListProduct = () => {
  return (
    <div className="right-container flex flex-col min-w-0 min-h-screen flex-1 ">
      {" "}
      {/* Use w-full (or remove it, as it's often default) */}
      {/* Category section */}
      <div className="flex w-full h-auto font-bold text-3xl py-4  pl-10">
        <span className="text-black">CATEGORY</span>
      </div>
      {/* Seacrh Bar Section */}
      <div className="z-10 bg-black sticky top-18 flex w-full h-auto justify-between py-5 px-10 gap-x-5 items-center rounded-full mb-4">
        {" "}
        {/* Added mb-4 */}
        <div className="flex w-full gap-10 items-center">
          <div className="text-white text-sm">BRAND : NVIDIA</div>
          <div className="text-white text-sm">SORT BY : Price</div>
        </div>

        <form action="" className="flex items-center gap-1">
          <Search className="w-7 h-7 text-white" />
          <input
            type="text"
            placeholder="Search"
            className="text-sm w-17 focus:w-60 h-8 flex items-center justify-center rounded-full bg-white pl-3 transition-all duration-500 "
          />
        </form>

      </div>
      {/* Product List Section */}
      <div>
        <ProductList />
        <ProductList />
        <ProductList />
        <ProductList />
        <ProductList />
        <ProductList />
        <ProductList />
      </div>
    </div>
  );
};
export default ListProduct;
