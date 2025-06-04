'use client'
import Image from "next/image";
import { X } from "lucide-react";
import { motion } from "motion/react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { upLoadImageCloudinary } from "../actionDashboard/upload/uploadImage";
import {
  createCategorySchema,
  TypeCreateCategory,
} from "schemas/upLoadCategorytShema";
import axios from "axios";
import { useState } from "react";

interface TypeUpdateAddCategory {
  setUpdateAddCategory: React.Dispatch<React.SetStateAction<boolean>>;
}



const FormCategory = ({ setUpdateAddCategory }: TypeUpdateAddCategory) => {
  const [message, setMessage] = useState<string | null>(null);
  const [errorExist, setErrorExist] = useState<boolean | null>(false);


  const [previewImage , setPreviewImage ] = useState<string[] | null>([])
 
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TypeCreateCategory>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      nameCategory: "",
      categoryImage: undefined,
    },
  });

  // Preview 
  const onFileChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files 
    if(!files || files.length === 0 ){
      setPreviewImage([])
      return
    }
    
    const urls = Array.from(files).map((f) => URL.createObjectURL(f))
    setPreviewImage(urls)
  }

  // Remove Preview

  const removePreview = (indexToRemove : number ) => {
    setPreviewImage((prev) => prev ? prev.filter((_, index) => index !== indexToRemove) : []);
  }



  /// On submit form
  const upLoadCategorySubmit = async (data: TypeCreateCategory) => {
    try {
      const formData = new FormData();
      formData.append("nameCategory", data.nameCategory);

      const checkExistCategory = await axios.post("/api/category/check-exist", {
        nameCategory: data.nameCategory,
      });

      // Check Exist Category
      if (checkExistCategory.data.exists) {
        setMessage("Category already exists");
        setErrorExist(true);
        setTimeout(() => {
          setMessage(null);
          setErrorExist(false);
        }, 3000);
        
        return;
      }

      const fileList = data.categoryImage as FileList;
      const uploadUrlImage = await upLoadImageCloudinary(fileList);

      const payload = {
        nameCategory: data.nameCategory,
        categoryImage: uploadUrlImage,
      };

      await axios.post("/api/category", payload);
    } catch (error) {
      console.log(error);
    }
    setUpdateAddCategory((prev) => !prev);
    reset();
    setPreviewImage([])
  };

  /// Reset Form
  const resetForm = () => {
    reset();
    console.log("Reset Form");
  };

  return (
    <motion.div 
    initial={{ opacity: 0 , y : -7}}
    animate={{ opacity: 1 , y : 0 }}
    transition={{ duration: 1 , delay : 0.3,  easings : "easeInOut"}}
    className="mt-3 flex flex-col justify-center items-center w-full h-full flex-1">
      {/* error  section */}
      {errorExist && (
        <div className="flex flex-col justify-center items-center w-auto h-auto gap-2 px-20 mb-2 py-5 bg-red-500 rounded-2xl">
          <div className="flex justify-center items-center w-full h-auto gap-2">
            <span className="text-sm text-white font-bold">{message}</span>
          </div>
        </div>
      )}

      {(errors.categoryImage || errors.nameCategory) && (
        <div className="flex flex-col justify-center items-center w-auto h-auto gap-2 px-20 mb-2 py-5 bg-red-500 rounded-2xl">
          {errors.categoryImage && (
            <div className="flex justify-center items-center w-full h-auto gap-2">
              <span className="text-sm text-white font-bold">
                {String(errors.categoryImage.message)}
              </span>
            </div>
          )}
          {errors.nameCategory && (
            <div className="flex justify-center items-center w-full h-auto gap-2">
              <span className="text-sm text-white font-bold">
                {String(errors.nameCategory.message)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Form category section */}

      <form
        onSubmit={handleSubmit(upLoadCategorySubmit)}
        className=" w-full h-full bg-white border border-zinc-200 rounded-lg py-5 mb-2 shadow-lg shadow-lime-50 overflow-hidden"
      >
        <div className="flex justify-center items-end w-full gap-2 ">
          <div className="flex items-center gap-2 italic relative">
            <button className="font-bold text-black bg-zinc-900 w-[200px] h-full rounded-lg absolute">
              <span className="text-lime-300 text-md hover:scale-95 transition-all duration-300">Upload Images</span>
            </button>
            <input
              {...register("categoryImage", {
                required: "Category image is required",
              })}
              onChange={onFileChange}
              className="pointer-events-none text-sm border border-zinc-200 cursor-pointer opacity-0 w-[200px] h-auto px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-lime-300 text-black transition-all duration-200"
              type="file"
              accept="image/*"
              // multiple
            />
          </div>

          <div className="flex flex-col items-center gap-1 ">
            <input
              {...register("nameCategory", {
                required: "Name category is required",
              })}
              className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg italic focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-lime-300 text-black transition-all duration-200"
              type="text"
              placeholder="Name Category"
            />
          </div>

          {/* Button Form */}

          <div className="flex gap-3 ml-3">
            <button
              disabled={isSubmitting}
              type="submit"
              className="flex items-center justify-center px-4 py-2 rounded-full bg-lime-300 text-black font-bold
             hover:text-lime-300 hover:bg-black transition-all duration-200 italic
             font-[Outfit] active:scale-95"
            >
              Add Category
            </button>
            <button
              onClick={resetForm}
              type="button"
              className="flex items-center justify-center px-7 py-2 rounded-full bg-red-600 text-white font-bold
              transition-all duration-200 italic
             font-[Outfit] active:scale-95"
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      {/* preview Image */}
      {previewImage && previewImage.map((url : string , index : number) => (
        <div key={index} className="w-full h-auto flex justify-center items-center gap-5 my-4 flex-wrap">
        <div
          className={`w-[150px] h-full rounded-2xl aspect-square relative overflow-hidden group bg-white shadow-md`}
        >
          <Image
            src={
              url
            }
            width={500}
            height={500}
            alt={"image"}
            className="object-cover w-full h-full p-3"
          />
          <div
            onClick={()=> removePreview(index)}
            className="bg-white w-6 h-6 absolute top-2 right-2 rounded-full flex justify-center items-center
            opacity-0 group-hover:opacity-100 transition-all duration-400 hover:rotate-180 shadow-sm
            "
          >
            <X className="w-5 h-5"  />
          </div>
        </div>
      </div>
      ))}
    </motion.div>
  );
};

export default FormCategory;
