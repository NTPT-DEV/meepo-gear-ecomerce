"use client";
import { Gamepad2, ShoppingCart, X } from "lucide-react";
import { useEffect } from "react";
import { useMenuCartStore } from "@/store/menuCart";
import { motion } from "motion/react";
import ItemOnCart from "./ItemOnCart";
import { useCartStore } from "@/store/cartStore";

const CartMenu = () => {
  const menuCart = useMenuCartStore((state) => state.menuCart);
  const toggleMenuCart = useMenuCartStore((state) => state.toggleMenuCart);

  /// get Cart Item
  const cart = useCartStore((state) => state.cart);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleClearCart = async () => {
    clearCart();
    console.log("is Click");
  };

  return (
    <>
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: `${menuCart ? "0%" : "100%"}`, opacity: 1 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        className="bg-zinc-900/90 backdrop-blur-sm fixed w-[500px] max-sm:w-screen max-sm:p-10 h-screen 
        top-0 right-0 z-70 p-5 hover:shadow-xl/100  transition-all duration-400"
      >
        <div className="flex justify-between items-center p-3">
          <div className="flex gap-2 ">
            <h1 className="text-3xl font-bold text-lime-300 font-[outfit]">
              C A R T
            </h1>
          </div>
          <X
            onClick={toggleMenuCart}
            className="text-lime-300 w-10 h-auto hover:rotate-180 transition-scale duration-300 cursor-pointer active:scale-80"
          />
        </div>

        <div className="flex flex-col gap-3 mt-5 max-h-[65vh] mb-5 overflow-y-auto no-scrollbar ">
          {/* CART ITEM COMPONENT */}
          <div className="flex flex-col gap-3">
            {cart.map((item, index) => (
              <ItemOnCart item={item} key={index} index={index} />
            ))}
          </div>
        </div>
        {/* TOTAL COMPONENT */}
        {cart.length > 0 ? (
          <div className=" flex flex-col mb-2 bg-lime-300 p-5 rounded-3xl">
            <div className="flex justify-between items-center w-full h-auto font-semibold">
              <div className="flex flex-col">
                <div className="font-bold">Total</div>
                <div>
                  Quantity : <span>000</span> Item
                </div>
              </div>

              <div className="text-lg font-bold font-[outfit]">9999999</div>
            </div>
            <div className="flex w-full justify-center items-center gap-3 mt-4">
              <button
                className="z-60 w-full h-auto text-white bg-black py-2 rounded-3xl font-bold
            active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Checkout
              </button>

              {/* RESET CART */}
              <button
                onClick={handleClearCart}
                className="z-60 w-1/4 h-auto text-white text-sm bg-red-700 py-2 px-4 rounded-3xl font-bold
              active:scale-95 transition-all duration-200 cursor-pointer text-nowrap"
              >
                Reset Cart
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-3 absolute rounded-full top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className=" border-4 border-lime-300 p-7 pr-9 rounded-full flex justify-center items-center animate-bounce">
              <ShoppingCart className="text-lime-300 w-30 h-auto" />
            </div>
            <h1 className="text-lime-300 text-4xl font-bold font-[outfit] text-nowrap">EMPTHY CART</h1>
          </div>
        )}
        <Gamepad2 className="text-lime-300 w-[70%] rotate-[10deg] left-50 bottom-0 right-50 h-auto font-bold absolute opacity-5" />
        <Gamepad2 className="text-lime-300 w-[35%] rotate-[-10deg] left-10 top-1/2 right-50 h-auto font-bold absolute opacity-5" />
        <ShoppingCart className="text-lime-300 w-[30%] rotate-[10deg] left-30 top-5 h-auto font-bold absolute opacity-5" />
      </motion.div>
    </>
  );
};
export default CartMenu;
