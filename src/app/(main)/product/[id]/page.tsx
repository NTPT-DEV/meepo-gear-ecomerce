"use client";
import AddWishList from "@/app/components/Layout/AddWishlist";
import BuyNowButton from "@/app/components/Layout/ButNowButton";
import ButtonAddToCart from "@/app/components/Layout/ButtonAddToCart";
import QuantityButton from "@/app/components/Layout/QuantityButton";
import { firstTextUppercase } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, use } from "react";

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
  images: ImageProduct[];
}

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [getProduct, setGetProduct] = useState<TypeGetProduct | null>(null);
  const [mainImage, setMainImage] = useState<string>("");


  const { id } = use(params);
  useEffect(() => {
    const fetchProductbyId = async () => {
      try {
        const res = await axios.get(`/api/product/${id}`);
        setGetProduct(res.data.product);
        setMainImage(res.data.product.images[0].secure_url || "");
        console.log(res.data.product);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProductbyId();
  }, [id]);

  console.log(getProduct);

  return (
    <div className="product-main-con flex flex-col flex-1 w-full max-w-[1440px] h-screen mx-auto px-10 gap-10">
      {/* Memu Navigation */}
      <div className="flex items-center w-full h-auto text-gray-400 text-sm gap-2 mt-5 font-[Outfit]">
        <Link
          href="/"
          className="hover:text-gray-700 transition-all duration-200"
        >
          <span>Home {">"}</span>
        </Link>
        <span>Category {">"}</span>
        <span>{firstTextUppercase(getProduct?.category?.name || "")}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full h-auto py-10">
        {/* Image Products */}

        <div className="flex flex-col items-center mb-5 gap-5">
          {/* Main Size Image */}
          <div className="flex justify-center items-center max-w-[500px] p-5 h-auto aspect-square rounded-4xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-all duration-200 ">
            {mainImage && (
              <Image
                draggable={false}
                priority={true}
                className="w-full h-auto hover:scale-105 transition-all duration-300"
                src={mainImage}
                alt=""
                width={500}
                height={500}
              />
            )}
          </div>

          {/* More Image */}

          <div className="flex justify-between max-w-[500px] gap-3 px-8 py-2">
            {getProduct?.images.map((img, index) => (
              <div
                key={index}
                onClick={() => setMainImage(img.secure_url)}
                className={`flex justify-center items-center w-full max-w-[150px] h-auto 
                 aspect-square rounded-2xl overflow-hidden bg-white 
                 shadow-sm hover:shadow-md transition-all duration-200 p-2
            ${mainImage === img.secure_url ? "ring-2 ring-lime-300" : ""}`}
              >
                <Image
                  draggable={false}
                  priority={true}
                  src={img.secure_url}
                  alt=""
                  width={500}
                  height={500}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}

        <div className="details-container flex flex-col gap-2 bg-white w-full p-5 ">
          <div className="text-4xl font-bold">{getProduct?.name}</div>
          <div className="text-2xl font-semibold text-zinc-700">
            {getProduct?.title}
          </div>

          <div className="text-4xl font-bold mt-5">฿{getProduct?.price}</div>
          <div className="flex justify-between items-center gap-3 w-full pr-3">
            <div className="flex items-center gap-5">
              <span className="font-semibold text-sm">
                Quantity : {getProduct?.quantity}
              </span>
              {/* Button Quantity */}
              <QuantityButton />
            </div>

            {/* Add Wishlist */}
            <AddWishList />
          </div>
          {/* Button Add to Cart and But Now */}
          <ButtonAddToCart />
          <BuyNowButton />

          {/* Spec details*/}
          <div className="flex  flex-col w-full h-auto my-12 gap-1">
            <h3 className="text-xl font-bold text-zinc-700">Details :</h3>
            <p className="text-sm text-zinc-500">{getProduct?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductPage;
