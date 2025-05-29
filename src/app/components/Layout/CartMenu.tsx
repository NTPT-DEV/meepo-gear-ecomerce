"use client"
import { CircleMinus, CirclePlus, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useMenuCartStore } from "@/store/menuCart";
import { motion } from 'motion/react'

const CartMenu = () => {
const menuCart = useMenuCartStore(state => state.menuCart);
const handleMenuCart = useMenuCartStore(state => state.handleMenuCart);

console.log(menuCart);

  const [count, setCount] = useState(1);
  const handleIncrese = () => {
    setCount(count + 1);
  };
  const handleDecrese = () => {
    if (count <= 1) return;
    setCount(count - 1);
  };

  return (
    <>
      <motion.div 
      initial = {{ x : '100%'}}
      animate = {{ x : `${menuCart ? '0%' : '100%'}`}}
      transition = {{ duration : 0.2 , ease : 'easeInOut'}}
      className="bg-zinc-900 fixed w-[500px] max-sm:w-screen max-sm:p-10 h-screen top-0 right-0 z-70 p-5 hover:shadow-xl/100  transition-all duration-200 ">
        <div className="flex justify-between items-center p-3">
          <div className="flex gap-2 ">
            <h1 className="text-3xl font-bold text-lime-300 font-[outfit]">
              CART
            </h1>
            <ShoppingCart className="text-lime-300 w-7 h-auto font-bold" />
          </div>
          <X 
          onClick={handleMenuCart}
          className="text-lime-300 w-10 h-auto hover:rotate-180 transition-all duration-200 cursor-pointer active:scale-80" />
        </div>

        <div className="flex flex-col gap-3 mt-5 ">
          {/* CART ITEM COMPONENT */}
          <div className="flex flex-col gap-3">
            <div className="flex w-full h-auto items-center p-5 gap-4 rounded-3xl mx-auto bg-white">
              <Image
                src="/1024.png"
                alt=""
                width={400}
                height={400}
                className="w-32 h-auto"
              />
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col gap-2">
                  {/* Name */}
                  <div className="font-bold text-md">
                    Lorem ipsum dolor sit amet.
                  </div>
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-sm text-gray-600">
                      Price :
                    </h1>
                    <h2 className="font-bold text-zinc-900">10000</h2>
                  </div>
                </div>
                {/* Quantity */}
                <div className="flex gap-2 my-2">
                  <div className="flex gap-3">
                    <CircleMinus
                      onClick={handleDecrese}
                      className="text-gray-500 hover:text-gray-900 w-5 h-auto transition-all duration-200"
                    />
                    <span className="font-bold text-xl border-2 border-gray-100 px-3 py-1 rounded-sm">{count}</span>
                    <CirclePlus
                      onClick={handleIncrese}
                      className="text-gray-500 hover:text-gray-900 w-5 h-auto transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Total price */}
          <div className=" flex flex-col mb-2 bg-lime-300 p-5 rounded-3xl">
            <div className="flex justify-between items-center w-full h-auto font-semibold">
              <div className="flex flex-col">
                <div className="font-bold">Total</div>
                <div>
                  Quantity : <span>{count}</span> Item
                </div>
              </div>

              <div className="text-lg font-bold font-[outfit]">9999999</div>
            </div>
            <button
              className="w-full h-auto text-white bg-black py-2 rounded-3xl my-3 font-bold
            active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Checkout
            </button>
          </div>
        </div>
      </motion.div>
      
    </>
  );
};
export default CartMenu;
