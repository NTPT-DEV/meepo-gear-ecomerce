"use client"
import { useCartStore } from "@/store/cartStore";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import type { CartItem } from "@/store/cartStore";
import { useMenuCartStore } from "@/store/menuCart";


const BtnProductCard = ({productId , name , price , quantity , product , images } : CartItem) => {
  const {addToCart} = useCartStore();
  const { manualMenuCart } = useMenuCartStore()
  // const { handleMenuCart } = useMenuCartStore()
  const {data : session} = useSession();

const handleAddToCart = async () => {
    if(!session) {
        alert('Please login first !!')
        redirect('/auth/sign-in');
    }
    addToCart({
      productId , name , price , quantity , product  , images   
    });
   
     try {
      await axios.post('/api/cart' , {
      productId,
      price,
      quantity,
      product 
      })
      manualMenuCart();

     }catch(err) {
      console.log(err);
     }
    }

  return (
    <div className="w-full">
      <button 
      onClick={handleAddToCart}
      className="bg-black text-white text-md w-full py-2 rounded-full active:scale-[98%] transition-all duration-200 cursor-pointer hover:bg-[#9AE600] hover:text-black font-[outfit] font-semibold ">
       Add to Cart
      </button>
    </div>
  );
};
export default BtnProductCard;
