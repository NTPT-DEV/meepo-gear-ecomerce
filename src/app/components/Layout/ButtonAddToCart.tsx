"use client";
import { IoMdCart } from "react-icons/io";
import { useSession } from "next-auth/react";
import { useCartStore, useQuantityStore } from "@/store/cartStore";
import { redirect } from "next/navigation";
import { TypeGetProduct } from "@/types/typesStore";
import { useMenuCartStore } from "@/store/menuCart";
import axios from "axios";

const ButtonAddToCart = ({ product }: { product: TypeGetProduct }) => {
  const { fetchCart } = useCartStore();
  const { manualMenuCart } = useMenuCartStore();
  const {  id, name, price, images } = product;
  const itemCount = useQuantityStore((state) => state.itemCount);
  const resetItemCount = useQuantityStore((state) => state.resetItemCount);
  const { addToCart } = useCartStore();
  const { data: session } = useSession();

  const handleAddToCart = async () => {
    if (!session) {
      alert("Please login first !!");
      redirect("/auth/sign-in");
    }
    try {
      addToCart({
        productId : id , 
        name,
        price,
        quantity: itemCount,
        images: images?.[0]?.secure_url,
        product: {
          name,
          price,
          images: images || [],
        },
      });

      await axios.post('/api/cart' , {
        productId: id,
        price,
        quantity: itemCount,
        product: {
          name,
          price,
          images: images || [],
        },
      })
      await fetchCart()
      manualMenuCart();
      resetItemCount();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-2 bg-[#9AE600] flex justify-center items-center w-full h-12
     rounded-xl cursor-pointer active:scale-95 transition-all duration-100 gap-2"
    >
      <span className=" text-lg">เพิ่มลงตะกร้า</span>
      <IoMdCart className="w-5 h-5 text-black" />
    </button>
  );
};
export default ButtonAddToCart;
