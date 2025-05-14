import Image from "next/image";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { upLoadImageCloudinary } from "../actionDashboard/upload/ีuploadImage";
import {
  createCategorySchema,
  TypeCreateCategory,
} from "schemas/upLoadCategorytShema";
import axios from "axios";
import { useState } from "react";

const FormCategory = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [errorExist, setErrorExist] = useState<boolean | null>(false);

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
  /// On submit form
  const upLoadCategorySubmit = async (data: TypeCreateCategory) => {
    try {

      const formData = new FormData();
      formData.append("nameCategory", data.nameCategory);

      const checkCategory = await axios.post("/api/category/check-exist", {
        nameCategory: data.nameCategory,
      });

      // Check Exist Category
      if (checkCategory.data.exists) {
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
  };

  /// Reset Form
  const resetForm = () => {
    reset();
    console.log("Reset Form");
  };



  return (
    <div className="mt-3 flex flex-col justify-center items-center w-full h-full flex-1">
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
          <div className="flex flex-col items-start gap-2 italic">
            <label className="text-lg font-bold text-black">
              Upload Images
            </label>
            <input
              {...register("categoryImage", {
                required: "Category image is required",
              })}
              className="text-sm border border-zinc-200 w-[200px] h-auto px-4 py-3 rounded-lg"
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
              className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg italic"
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
      <div className="w-full h-auto flex justify-center items-center gap-5 my-4 flex-wrap ">
        <div
          className={`w-[150px] h-full rounded-2xl aspect-square relative overflow-hidden group`}
        >
          <Image
            src={
              "https://res.cloudinary.com/dhmfewrsr/image/upload/v1746966457/blackwell-geforce-rtx-50-series_cdiswm.jpg"
            }
            width={500}
            height={500}
            alt={"image"}
            className="object-cover w-full h-full"
          />
          <div
            className="bg-white w-6 h-6 absolute top-2 right-2 rounded-full flex justify-center items-center
            opacity-0 group-hover:opacity-100 transition-all duration-400 hover:rotate-180
            "
          >
            <X className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCategory;
