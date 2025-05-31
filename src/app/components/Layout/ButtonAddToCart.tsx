
"use client";
import { IoMdCart } from "react-icons/io";
import { useSession } from "next-auth/react";

const ButtonAddToCart = () => {

  
  const { data: session } = useSession();
  
  const handleClickAddToCart = () => {
    if (session) {
      console.log("add to cart success");
    } else {
      console.log("add to cart fail");
    }
  };

  
  return (
    <button
      onClick={handleClickAddToCart}
      className="mt-2 bg-[#9AE600] flex justify-center items-center w-full h-12
     rounded-xl cursor-pointer active:scale-95 transition-all duration-100 gap-2"
    >
      <span className=" text-lg">เพิ่มลงตะกร้า</span>
      <IoMdCart className="w-5 h-5 text-black" />
    </button>
  );
};
export default ButtonAddToCart;
