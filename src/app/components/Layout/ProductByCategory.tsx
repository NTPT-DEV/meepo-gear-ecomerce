"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import BtnProductCard from "./ui/BtnProductCard";

// interface ProductCardProps {
//   products: TypeGetProduct[];
// }

interface ImageProduct {
  public_id: string;
  secure_url: string;
}
interface Category {
  name: string;
}

interface TypeGetProduct {
  id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: Category;
  categoryId: string;
  images: ImageProduct[];
}

const animateProductVar = {
  initial: {
    opacity: 0,
    y: 5,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.1 * index,
    },
  }),
};

const ProductByCategory = ({ categoryId }: { categoryId: string }) => {
  const [getProducts, setGetProducts] = useState<TypeGetProduct[]>([]);

  useEffect(() => {
    if (!categoryId) return console.log("categoryId is required");
    const getProductByCategoryId = async () => {
      try {
        const res = await axios.get(`/api/product/category/${categoryId}`);
        setGetProducts(res.data.products);
      } catch (err) {
        console.log(err);
      }
    };
    getProductByCategoryId();
  }, [categoryId]);

  return (
    <div className="flex flex-col w-full min-h-screen my-2">
      <div className="flex w-full p-5 justify-center items-center text-2xl font-[outfit] font-black bg-black rounded-tl-full rounded-tr-full shadow-md shadow-black/20">
        <motion.h1 
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 , delay : 0.8 , ease : "easeInOut"} }}
        viewport={{ once: true }}
        className="text-lime-300">
          {getProducts.length === 0 ? <span>Loading...</span> : getProducts[0].category.name.toUpperCase() ?? 'ไม่มีหมวดหมู่'}
        </motion.h1>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-2 py-3 mt-3 ">
        {getProducts && getProducts.map((item, index) => (
          <motion.div
            variants={animateProductVar}
            initial="initial"
            custom={index}
            whileInView="animate"
            viewport={{ once: true }}
            key={item.id}
            className="flex flex-col w-[250px] h-[490px] rounded-3xl shadow-sm  p-2 overflow-hidden hover:shadow-md/20 transition-shadow duration-300 bg-white relative"
          >
            <Link href={`/product/${item.id}`}>
              <div className="flex justify-center items-center w-full p-5">
                <Image
                  src={item.images[0].secure_url}
                  alt=""
                  width={300}
                  height={300}
                  className="object-cover hover:scale-110 transition-transform duration-300 "
                />
              </div>
            </Link>
            <div className="w-full flex flex-col gap-1 p-3">
              <h1 className="text-lg font-bold mt-2 line-clamp-2">
                {item.name}
              </h1>
              <h3 className="text-sm font-semibold italic text-zinc-500  line-clamp-2">
                {item.title}
              </h3>
              <div className="flex flex-col justify-center items-start w-full gap-y-2 mt-3 absolute bottom-3 left-0 p-5">
                <h1 className="text-2xl mt-3 font-bold">฿{item.price}</h1>
                <BtnProductCard
                  product={item}
                  productId={item.id}
                  name={item.name}
                  price={item.price}
                  quantity={1}
                  images={item.images[0].secure_url}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default ProductByCategory;
