"use client";

import { firstTextUppercase } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import MenuBtnDashboard from "./MenuBtnDashboard";
import { motion } from "motion/react";
import Link from "next/link";

interface CategoryType {
  id: string;
  name: string;
  categoryImage: {
    public_id: string;
    secure_url: string;
  }[];
}

interface ListCategoryType {
  updateAddCategory: boolean;
}

export const varliantsCategory = {
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

const ListCategory = ({ updateAddCategory }: ListCategoryType) => {
  const [category, setCategory] = useState<CategoryType[]>([]);

  // getAll Catagory
  useEffect(() => {
    const fetcGetAllCategory = async () => {
      const response = await axios.get("/api/category");
      setCategory(response.data.categories);
    };

    fetcGetAllCategory();
  }, [updateAddCategory]);

  const handleDeleteSuccess = (id: string) => {
    setCategory((prevState) => prevState.filter((item) => item.id !== id));
  };

  return (
    <>
      {category &&
        category.map((item, index) => (
          <motion.div
            variants={varliantsCategory}
            initial="initial"
            whileInView="animate"
            custom={index}
            key={item.id}
            className="grid grid-cols-4 w-full h-auto gap-5 items-center bg-white trasition-all duration-200 py-3 hover:shadow-sm border-b border-gray-100 hover:-translate-y-0.5 transform
            
            "
          >
            {/* Image */}

            <div className="flex justify-center items-center">
              <Link href={`/category/${item.id}`}>
                <div className="flex justify-center items-center bg-white w-[120px] aspect-square h-auto rounded-4xl drop-shadow-md overflow-hidden">
                  {item.categoryImage.map((item, index) => (
                    <Image
                      key={index}
                      className="p-3"
                      src={item.secure_url}
                      alt="test image"
                      width={300}
                      height={300}
                    />
                  ))}
                </div>
              </Link>
            </div>

            {/* Name & title */}
            <div className="flex justify-start items-center ml-3">
              <div className="flex flex-col items-start gap-1">
                <p className="text-sm text-gray-500 truncate">categories :</p>
                <h2 className="text-xl font-bold text-black truncate">
                  {firstTextUppercase(item.name)}
                </h2>
              </div>
            </div>

            {/* Product quantity in category */}
            <div className="flex justify-center items-center gap-4">
              <div className="font-semibold"> Product in stock :</div>
              <div className="flex justify-center items-center bg-white w-9 h-9 rounded-full shadow-sm border border-gray-100 text-black">
                <span className="text-sm font-bold line-clamp-6">99</span>
              </div>
            </div>

            {/* menu edit & delete */}

            {/* test delete */}
            <MenuBtnDashboard
              id={item.id}
              public_id={item.categoryImage.map((item) => item.public_id)}
              onDeleteSuccess={handleDeleteSuccess}
            />
          </motion.div>
        ))}
    </>
  );
};
export default ListCategory;
