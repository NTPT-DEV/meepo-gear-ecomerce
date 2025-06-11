"use client";
import AddWishList from "@/app/components/Layout/ui/AddWishlist";
import BuyNowButton from "@/app/components/Layout/ui/ButNowButton";
import ButtonAddToCart from "@/app/components/Layout/ui/ButtonAddToCart";
import QuantityButton from "@/app/components/Layout/ui/QuantityButton";
import { firstTextUppercase } from "@/lib/utils";
import { TypeGetProduct } from "@/types/typesStore";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, use } from "react";
import { motion } from "motion/react";

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [getProduct, setGetProduct] = useState<TypeGetProduct | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [showMore, setShowMore] = useState<boolean>(false);

  const { id } = use(params);

  useEffect(() => {
    const fetchProductbyId = async () => {
      try {
        const res = await axios.get(`/api/product/${id}`);
        setGetProduct(res.data.product);
        setMainImage(res.data.product.images[0].secure_url || "");
      } catch (err) {
        console.log(err);
      }
    };
    fetchProductbyId();
  }, [id]);

  const handleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <div className="product-main-con flex flex-col flex-1 w-full max-w-[1440px] h-screen mx-auto px-10 gap-5">
      {/* Memu Navigation */}
      <div className="flex items-center w-full h-auto text-gray-400 text-sm gap-2 mt-5 font-[Outfit]">
        <Link
          href="/"
          className="hover:text-gray-700 transition-all duration-200"
        >
          <span>Home {">"}</span>
        </Link>
        <span>Category {">"}</span>
        <Link href={`/category/${getProduct?.category?.id}`}>
          <span className="hover:text-gray-700 transition-all duration-200">
            {firstTextUppercase(getProduct?.category?.name || "")}
          </span>
        </Link>
      </div>

      {getProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.03, ease: "easeInOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full h-auto py-10"
        >
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

            <div className="flex justify-center items-center gap-3 w-full h-auto py-2 flex-wrap">
              {getProduct?.images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(img.secure_url)}
                  className={`flex justify-center items-center w-[75px] h-auto  max-[768px]:w-[90px]
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

            <div className="flex items-center justify-between w-full">
              <div className="text-4xl font-bold my-3 ">
                ฿{getProduct?.price}
              </div>
              <AddWishList />
            </div>
            <div className="flex justify-between items-center gap-3 w-full pr-3">
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col gap-1">
                  <span className="w-full font-semibold text-sm flex-nowrap text-nowrap">
                    Quantity : {getProduct?.quantity}
                  </span>
                  <span className="font-semibold text-sm">
                    Sold : {getProduct?.sold}
                  </span>
                </div>

                {/* Button Quantity */}
                <QuantityButton />
              </div>

              {/* Add Wishlist */}
            </div>
            {/* Button Add to Cart and But Now */}
            {getProduct && (
              <>
                <ButtonAddToCart product={getProduct!} />
                <BuyNowButton />
              </>
            )}

            {/* Spec details*/}
            <div className="flex  flex-col w-full h-auto my-12 gap-1">
              <h3 className="text-xl font-bold text-zinc-700">Details :</h3>
              <p className="text-sm text-zinc-500">
                {showMore ? (
                  <>
                    {getProduct?.description}
                    <span
                      onClick={handleShowMore}
                      className="text-zinc-400 hover:text-zinc-700 transition-all duration-200 cursor-pointer text-[16px] italic"
                    >
                      ...ย่อลง
                    </span>
                  </>
                ) : (
                  <>
                    {getProduct?.description.substring(0, 450)}
                    <span
                      onClick={handleShowMore}
                      className="text-zinc-400 hover:text-zinc-700 transition-all duration-200 cursor-pointer text-[16px] italic"
                    >
                      ...อ่านเพิ่มเติม
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
export default ProductPage;
