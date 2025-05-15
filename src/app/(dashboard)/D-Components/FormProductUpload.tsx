import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProductSchema, TypeProductSchema } from "schemas/productFormSchema";
import PreviewImage from "./PreviewImage";

interface CategoryType {
  id: string;
  name: string;
}

const FormProductUpload = () => {

  //get list Category to select
  const [categoryData, setCategoryData] = useState<CategoryType[]>([]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const getAll = await axios.get("/api/category");
        if (!getAll) {
          console.log("No Category Found");
        }
        setCategoryData(getAll.data.categories);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategory();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      title: "",
      description: "",
    },
  });

  const handleSubmitProduct = (data: TypeProductSchema) => {
    console.log("SUBMIIITTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT", data);
  };

  const resetForm = () => {
    reset();
    console.log("Reset Form");
  };

  return (
    // import Produt Section
    <div className="flex justify-center items-center w-full p-5 h-auto flex-1 ">
      <form
        onSubmit={handleSubmit(handleSubmitProduct)}
        className="max-w-[700px] w-full px-10"
      >
        {/* Upload Images */}
        <div className="flex flex-col gap-1 mb-5">
          {/* error */}
          {errors.productImage && (
            <div className="flex justify-center items-center w-full h-auto gap-2 bg-red-500 py-2 my-2 rounded-xl">
              <span className="text-sm text-white font-bold">
                {String(errors.productImage.message)}
              </span>
            </div>
          )}

          <label className="text-lg font-bold text-black">Upload Images</label>
          <input
            {...register("productImage", {
              required: "Image is required atleast 1 image",
            })}
            className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-lime-300 text-black transition-all duration-200"
            type="file"
            accept="Images/*"
            multiple
          />
        </div>

        {/* Preview Image Uploading Section */}
        <p className="text-gray-500">mockup for preview image</p>
        <div className="flex justify-center items-center w-full h-auto gap-4 flex-wrap mb-3 py-3">
          <PreviewImage />
          <PreviewImage />
          <PreviewImage />
          <PreviewImage />
          <PreviewImage />
        </div>

        {/* Name Product */}
        <div className="flex flex-col gap-1 mb-5">
          {/* error */}
          {errors.name && (
            <div className="flex justify-center items-center w-full h-auto gap-2 bg-red-500 py-2 my-2 rounded-xl">
              <span className="text-sm text-white font-bold">
                {String(errors.name.message)}
              </span>
            </div>
          )}

          <label className="text-lg font-bold text-black">Name</label>
          <input
            {...register("name", {
              required: "name is required",
            })}
            className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-lime-300 text-black transition-all duration-200"
            type="text"
            placeholder="Name Product"
          />
        </div>

        {/* Title */}

        <div className="flex flex-col gap-1 mb-5">
          {/* error */}
          {errors.title && (
            <div className="flex justify-center items-center w-full h-auto gap-2 bg-red-500 py-2 my-2 rounded-xl">
              <span className="text-sm text-white font-bold">
                {String(errors.title.message)}
              </span>
            </div>
          )}

          <label className="text-lg font-bold text-black">Title</label>
          <input
            {...register("title", {
              required: "Title is required",
            })}
            className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-lime-300 text-black transition-all duration-200"
            type="text"
            placeholder="Title Product"
          />
        </div>

        {/* Description */}

        <div className="flex flex-col gap-1 mb-5">
          {/* error */}
          {errors.description && (
            <div className="flex justify-center items-center w-full h-auto gap-2 bg-red-500 py-2 my-2 rounded-xl">
              <span className="text-sm text-white font-bold">
                {String(errors.description.message)}
              </span>
            </div>
          )}

          <label className="text-lg font-bold text-black">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="flex text-sm border border-zinc-200 w-full h-[200px] px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-lime-300 text-black transition-all duration-200"
            placeholder="Description Product"
          />
        </div>

        {/* Price */}

        <div className="flex flex-col gap-1 mb-5">
          {/* error */}
          {errors.price && (
            <div className="flex justify-center items-center w-full h-auto gap-2 bg-red-500 py-2 my-2 rounded-xl">
              <span className="text-sm text-white font-bold">
                {String(errors.price.message)}
              </span>
            </div>
          )}
          <label className="text-lg font-bold text-black">Price</label>
          <input
            {...register("price", {
              required: "Price is required",
            })}
            className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-lime-300 text-black transition-all duration-200"
            type="number"
            placeholder="Price"
          />
        </div>

        {/* Quantity */}

        {/* Container Categories & Quantity */}
        <div className="flex justify-between w-full h-auto gap-5 max-md:flex-col">
          {/* Quantity */}

          <div className="flex flex-col gap-1 mb-5 w-full">
            {/* error */}
            {errors.quantity && (
              <div className="flex justify-center items-center w-full h-auto gap-2 bg-red-500 py-2 my-2 rounded-xl">
                <span className="text-sm text-white font-bold">
                  {String(errors.quantity.message)}
                </span>
              </div>
            )}
            <label className="text-lg font-bold text-black">Quantity</label>
            <input
              {...register("quantity", {
                required: "Quantity is required",
              })}
              className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-lime-300 text-black transition-all duration-200"
              type="number"
              placeholder="Quantity"
            />
          </div>

          {/* Category */}

          <div className="flex flex-col gap-1 mb-5 w-full">
            {/* error */}
            {errors.category && (
              <div className="flex justify-center items-center w-full h-auto gap-2 bg-red-500 py-2 my-2 rounded-xl">
                <span className="text-sm text-white font-bold">
                  {String(errors.category.message)}
                </span>
              </div>
            )}
            <label className="text-lg font-bold text-black">Categories</label>
            <select
              {...register("category", {
                required: "Category is required",
              })}
              className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-lime-300 text-black transition-all duration-200
              "
            >
              <option value="">Select a Category</option>
              {categoryData.map((item, index) => (
                <option className="" key={index} value={item.id}>
                  {item.name.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Button section */}
        <div className="flex w-full justify-center items-center gap-3 max-md:flex-col">
          <button
            type="submit"
            className="flex w-full items-center justify-center px-7 py-4 rounded-lg
             bg-lime-300 text-black font-bold hover:bg-black hover:text-lime-300 
             transition-all duration-200 active:scale-95 mdl"
          >
            ADD PRODUCT
          </button>
          <button
            onClick={resetForm}
            type="button"
            className="flex w-full flex-1/3 items-center justify-center px-7 py-4 rounded-lg
             bg-red-600 text-white font-bold active:scale-95 transition-all duration-200"
          >
            RESET
          </button>
        </div>
      </form>
    </div>
  );
};
export default FormProductUpload;
