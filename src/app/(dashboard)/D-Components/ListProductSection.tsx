import { Search } from "lucide-react";
import ProductList from "./ProductList";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductType } from "schemas/productFormSchema";

export interface TypeListProduct {
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

const ListProduct = () => {

const [ allProduct , setAllProduct ] = useState<ProductType[]>([]);
const [ products , setProducts ] = useState<ProductType[]>([]);

const { register ,watch } = useForm();
const searchRealtime = watch('search')

useEffect(()=> {
     const handleGetAll = async () => {
      try { 
        const res = await axios.get(`/api/product/`);
        setAllProduct(res.data.products);
        setProducts(res.data.products);
      }catch(error) { 
        console.log(error);
      }
    }
  
handleGetAll()
},[])


useEffect(() => {
  const delaySerchTime = setTimeout(() => {
    const handleSearch = async () => {
      try {
        const res = await axios.get(`/api/product/search/${searchRealtime}`);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (!searchRealtime || searchRealtime.trim() === '') {
      setProducts(allProduct);
    } else {
      handleSearch();
    }
  }, 500);

  return () => clearTimeout(delaySerchTime);
}, [searchRealtime, allProduct]);



  return (
    
    <div className="right-container flex flex-col min-w-0 min-h-screen flex-1 ">
      
      <div className="flex w-full h-auto font-bold text-3xl py-4  pl-10">
        <span className="text-black">List All Product</span>
      </div>
      {/* Seacrh Bar Section */}
      <div className="z-10 bg-black sticky top-18 flex w-full h-auto justify-between py-5 px-10 gap-x-5 items-center rounded-full mb-4">
        
        {/* Added mb-4 */}
        <div className="flex w-full gap-10 items-center">
          <div className="text-white text-sm">BRAND : NVIDIA</div>
          <div className="text-white text-sm">SORT BY : Price</div>
        </div>

        <form action="" className="flex items-center gap-1">
          <Search className="w-7 h-7 text-white" />
          <input
            {...register('search')}
            type="text"
            placeholder="Search"
            className="text-sm w-17 focus:w-60 h-8 flex items-center justify-center 
            rounded-full bg-white pl-3 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-lime-300"
          />
        </form>

      </div>
      {/* Product List Section */}
      <div>
        <ProductList products={products} setProducts={setProducts} />
      </div>
    </div>
  );
};
export default ListProduct;
