import axios from "axios";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Product {
  id : string
  name: string;
  title: string;
  description: string;
  price: number;
  images: {
    public_id: string;
    secure_url: string;
  }[];
  category: {
    name: string;
  };
  _id: string;
}

const SearchProduct = () => {
  const [result, setResult] = useState([]);
  const [isClick, setIsClick] = useState(false);

  const { register, reset, watch } = useForm();

  const searchRealtime = watch("search");
  
  /// Search Product action & Debounce
  useEffect(() => {
    if (!searchRealtime || searchRealtime.trim() === "") {
      return setResult([]);
    }

    const timer = setTimeout(() => {
        const handleSearch = async () => {
      try {
        const searchResponse = await axios.get(
          `/api/product/search/${searchRealtime}`
        );
        setResult(searchResponse.data);
        console.log(searchResponse.data);
      } catch (err) {
        console.log(err);
      }
    };
    handleSearch();
    }, 500)

    return () => clearTimeout(timer)
  
  }, [searchRealtime]);

  const toggleSearch = () => {
    setIsClick((prev) => !prev);
  };

  const closeSearch = () => {
    setIsClick(false);
    reset();
  };

  return (
    <>
      <div className="flex">
        <Search
          onClick={toggleSearch}
          className=" text-white w-6 h-6 group-hover:text-lime-300 transition-all duration-200 active:scale-95"
        />
      </div>
      {isClick && (
        <div className="flex justify-center items-center fixed inset-0 z-10 bg-black/50 backdrop-blur-xs">
          <div className="bg-lime-300/20 w-[70%]  overflow-y-hidden rounded-2xl px-6 pt-4 pb-7 border-3 border-lime-300 flex flex-col items-center relative shadow-md">
            {/* Search Bar */}
            <div className="flex justify-center items-center w-full gap-2 p-3 mt-5 z-20">
              <Search className=" w-10 h-10 text-lime-300 transition-all duration-200 animate-bounce" />
              <input
                {...register("search")}
                className="bg-white w-full h-full border flex items-center border-zinc-200 p-4 rounded-3xl text-2xl text-zinc-400 transition-all duration-200
                placeholder:text-zinc-300 placeholder:text-[24px] focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-lime-300
                "
                type="text"
                placeholder="Search Product"
              />

              <X
                onClick={closeSearch}
                className="text-lime-300 w-7 h-7 absolute right-3 top-3 hover:rotate-180 transition-all duration-100 active:scale-95"
              />
            </div>

            {/* Product from search */}
            <div className="flex flex-col items-center w-[90%] gap-y-[0.01rem] overflow-y-auto max-h-[370px] my-2 no-scrollbar">
              {result.length > 0 &&
                result.map((item: Product, index) => (
                  <Link key={index} href={`/product/${item.id}`} className="flex justify-center items-center w-full">
                    <div className="flex justify-center items-center w-full min-h-20 h-auto p-3
                     bg-white rounded-2xl border border-zinc-200  hover:shadow-md 
                     transittion-all duration-200 scale-95 hover:scale-100">
                      <div className="grid grid-cols-4 w-full h-full gap-4 items-center justify-items-center text-zinc-800">
                        {/* image */}
                        <div className="flex justify-center items-center w-15 h-15 bg-white rounded-lg overflow-hidden p-1 shadow-xs">
                          <Image
                            className="object-cover"
                            src={item.images[0].secure_url}
                            alt=""
                            width={100}
                            height={100}
                          />
                        </div>
                        {/* Name */}
                        <div className="text-center text-sm font-semibold">
                          {item.name}
                        </div>
                        {/* Price */}
                        <div className="text-center text-md font-bold">
                          ฿{item.price}
                        </div>
                        {/* Category */}
                        <div className="text-md italic">
                          {item.category.name.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SearchProduct;
