"use client";
import Link from "next/link";
import LogoMeepoGear from "../logoSvg/LogoMeepoGear";
import { CircleUserRound, ShoppingBag } from "lucide-react";
import SignOutBtn from "./ui/SignOutBtn";
import { useSession } from "next-auth/react";
import AdminBtn from "./ui/AdminBtn";
import SearchProduct from "./SearchProduct";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import CartMenu from "./CartMenu";
import { useMenuCartStore } from "@/store/menuCart";
import { useCartStore } from "@/store/cartStore";

const Navbar = () => {
  const { data: session } = useSession();
  const [onToggle, setOnToggle] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const cart = useCartStore((state) => state.cart);
  const toggleMenuCart = useMenuCartStore((state) => state.toggleMenuCart);

  const toggleMenu = () => {
    setOnToggle((prev) => !prev);
  };

  return (
    <div className="main-container">
      <div className="bg-black flex justify-between items-center w-full h-22 px-10 rounded-b-[40px] 
      max-sm:px-5
      ">
        {/* Logo Main */}

        <motion.div
          initial={{ opacity: 0, x: -2 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Link href="/">
            <LogoMeepoGear
              className="text-white w-36 h-auto 
          max-[475px]:w-30 max-[375px]:w-28 
          "
            />
          </Link>
        </motion.div>

        <div className="nav-con flex items-center gap-3 max-[475px]:gap-1 cursor-pointer group">
          {/* search bar */}
          <motion.div
            initial={{ opacity: 0, x: -2 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <SearchProduct />
          </motion.div>

          {/* button Login LogOut - Register */}
          <motion.div
            initial={{ opacity: 0, x: -2 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            viewport={{ once: true }}
            className="flex justify-center items-center gap-3"
          >
            {session && session?.user ? (
              <>
                <p className="text-white font-bold text-sm font-[outfit] max-md:hidden">
                  {session?.user?.email}
                </p>
                {/* {session?.user?.role === "admin" && <AdminBtn />} */}
                <SignOutBtn className="bg-black w-[95px] max-sm:w-[80px] h-[30px] rounded-full flex justify-center items-center cursor-pointer border-2 border-lime-300" />
              </>
            ) : (
              <>
                <motion.p
                  initial={{ opacity: 0, x: -2 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="text-white font-bold text-sm max-sm:hidden"
                >
                  Guest
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: -2 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="flex gap-2"
                >
                  <Link href={"/auth/sign-in"}>
                    <motion.div
                      initial={{ opacity: 0, x: -2 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1, delay: 0.8 }}
                      viewport={{ once: true }}
                      className="bg-[#9AE600] w-[95px] max-md:w-[80px] max-[475px]:hidden h-[30px] rounded-full flex justify-center items-center"
                    >
                      <span className="text-sm text-black italic font-semibold">
                        Login
                      </span>
                    </motion.div>
                  </Link>

                  <Link href={"/auth/sign-up"}>
                    <div className="bg-white w-[95px] max-md:w-[80px] max-[475px]:hidden h-[30px] rounded-full flex justify-center items-center">
                      <span className="text-sm text-black italic font-semibold">
                        SignUp
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </>
            )}
          </motion.div>

          {/* button Cart */}
          <div className="flex gap-2 ">
            <motion.div
              initial={{ opacity: 0, x: -2 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
              onClick={toggleMenuCart}
              className="relative"
            >
              <ShoppingBag className="text-white w-6 relative" />
              <div className=" bg-lime-300 absolute -top-1 -right-1 w-4 h-4 rounded-full flex justify-center items-center">
                <span className="rounded-full text-[12px] text-black font-bold font-[Outfit]">
                  {cart?.reduce((acc, item) => acc + item.quantity, 0) || 0}
                </span>
              </div>
            </motion.div>

            <CartMenu />

            {/* Icon Menu Profile */}

            <div className={`reative flex`}>
              <motion.div
                initial={{ opacity: 0, x: -2 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                viewport={{ once: true }}
              >
                <CircleUserRound
                  onClick={toggleMenu}
                  className="text-white w-6 h-6"
                />
              </motion.div>
              {onToggle && (
                <motion.div
                  ref={menuRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={` flex flex-col border-2 border-lime-300 items-center gap-2 min-w-50 h-70 absolute bg-black/70 backdrop-blur-xs z-60 top-22 right-4 rounded-2xl p-4 
                }`}
                >
                  <div className="flex justify-center w-full">
                    <CircleUserRound
                      onClick={toggleMenu}
                      className="w-10 h-10 text-lime-300"
                    />
                  </div>
                  <div className="text-lime-300 font-semibold">{`User Name : ${session?.user?.name}`}</div>
                  <div className="text-lime-300 font-semibold">{`Email : ${session?.user?.email}`}</div>
                  <div className="text-lime-300 font-semibold">{`Role : ${session?.user?.role?.toUpperCase()}`}</div>
                  <div className="text-lime-300 font-semibold">
                    {`Status : ${
                      session?.user?.statusUser ? "Enable" : "Disable"
                    }`}
                  </div>
                  <div className="flex justify-center items-center gap-2 w-full my-2">
                    {session?.user?.role === "admin" && (
                      <AdminBtn className="bg-lime-300 w-[95px] h-[30px] rounded-full flex justify-center items-center cursor-pointer  border-2 border-lime-300" />
                    )}
                    <SignOutBtn className="bg-black w-[95px] h-[30px] rounded-full flex justify-center items-center cursor-pointer border-2 border-lime-300" />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
