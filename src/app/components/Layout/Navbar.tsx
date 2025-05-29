"use client";
import Link from "next/link";
import LogoMeepoGear from "../logoSvg/LogoMeepoGear";
import { CircleUserRound, ShoppingBag } from "lucide-react";
import SignOutBtn from "./SignOutBtn";
import { useSession } from "next-auth/react";
import AdminBtn from "./AdminBtn";
import SearchProduct from "./SearchProduct";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react"
import CartMenu from "./CartMenu";
import { useMenuCartStore } from "@/store/menuCart";

// import AdminBtn from "./AdminBtn";

const Navbar = () => {
  const { data: session } = useSession();
  const [onToggle, setOnToggle] = useState(false);
  const  menuRef =  useRef<HTMLDivElement>(null)
  const handleMenuCart  = useMenuCartStore(state => state.handleMenuCart)


  
  const toggleMenu = () => {
    console.log("isClick");
    setOnToggle((prev) => !prev);
  };
  
  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOnToggle(false);
      }
    };
    if (onToggle) {
      document.addEventListener("mousedown", handleClickOutSide);
      return () => {
        document.removeEventListener("mousedown", handleClickOutSide);
      };
  }
}, [onToggle]);


  return (
    <div className="main-container">
      <div className="bg-black flex justify-between items-center w-full h-22 px-10 rounded-b-[40px] ">
        {/* Logo Main */}

        <Link href="/">
          <LogoMeepoGear
            className="text-white w-36 h-auto
          max-sm:w-30
          "
          />
        </Link>

        <div className="nav-con flex items-center gap-3 cursor-pointer group">
          {/* search bar */}
          <SearchProduct />

          {/* button Login LogOut - Register */}
          <div className="flex justify-center items-center gap-3 max-md:hidden">
            {session?.user ? (
              <>
                <p className="text-white font-bold text-sm">
                  {session?.user?.email}
                </p>
                {/* {session?.user?.role === "admin" && <AdminBtn />} */}
                <SignOutBtn className="bg-black w-[95px] h-[30px] rounded-full flex justify-center items-center cursor-pointer border-2 border-lime-300" />
              </>
            ) : (
              <>
                <p className="text-white font-bold text-sm max-sm:hidden">
                  Guest
                </p>
                <div className="flex gap-2">
                  <Link href={"/auth/sign-in"}>
                    <div className="bg-[#9AE600] w-[95px] h-[30px] rounded-full flex justify-center items-center">
                      <span className="text-sm text-black italic font-semibold">
                        Login
                      </span>
                    </div>
                  </Link>

                  <Link href={"/auth/sign-up"}>
                    <div className="bg-white w-[95px] h-[30px] rounded-full flex justify-center items-center">
                      <span className="text-sm text-black italic font-semibold">
                        SignUp
                      </span>
                    </div>
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* button Cart */}
          <div className="flex gap-2 ">
            <div 
            onClick={handleMenuCart}
            className="relative">
              <ShoppingBag 
              className="text-white w-6 relative" />
              <div className=" bg-lime-300 absolute -top-1 -right-1 w-4 h-4 rounded-full flex justify-center items-center">
                <span className="rounded-full text-[12px] text-black font-bold font-[Outfit]">
                  0
                </span>
              </div>
            </div>

            <CartMenu />


            {/* Icon Menu Profile */}
            <div className={`reative flex`}>
              <CircleUserRound
                onClick={toggleMenu}
                className="text-white w-6 h-6"
              />
              <AnimatePresence>
              {onToggle && (
              <motion.div
              ref={menuRef}
              initial={{ opacity : 0}}
              animate={{opacity : 1}}
              exit={{opacity : 0}}
              transition={{duration : 0.2}}
                className={` flex flex-col border-2 border-lime-300 items-center gap-2 min-w-50 h-70 absolute bg-black z-60 top-22 right-4 rounded-2xl p-4 
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
                <div className="text-lime-300 font-semibold">{`Email : ${session?.user?.role?.toUpperCase()}`}</div>
                <div className="text-lime-300 font-semibold">{`Status : ${
                  session?.user?.statusUser ? "Enable" : "Disable"}`}
                </div>
                <div className="flex justify-center items-center gap-2 w-full my-2">
                  <AdminBtn className='bg-lime-300 w-[95px] h-[30px] rounded-full flex justify-center items-center cursor-pointer  border-2 border-lime-300' />
                  <SignOutBtn className="bg-black w-[95px] h-[30px] rounded-full flex justify-center items-center cursor-pointer border-2 border-lime-300" />
                </div>
              </motion.div>
            )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      {/* Menu Bar */}
    </div>
  );
};
export default Navbar;
