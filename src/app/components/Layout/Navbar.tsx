"use client";
import Link from "next/link";
import LogoMeepoGear from "../logoSvg/LogoMeepoGear";
import { CircleUserRound, Search, ShoppingBag } from "lucide-react";
import SignOutBtn from "./SignOutBtn";
import { useSession } from "next-auth/react";
import AdminBtn from "./AdminBtn";
// import AdminBtn from "./AdminBtn";

const Navbar = () => {
  const { data: session } = useSession();
  // console.log(session);
  // console.log(session?.user?.role);

  return (
    <div className="main-container">
      <div className="bg-black flex justify-between items-center w-full h-22 px-10 rounded-b-[40px]">
        {/* Logo Main */}

        <Link href="/">
          <LogoMeepoGear className="text-white w-36 h-auto" />
        </Link>

        <div className="nav-con flex items-center gap-3">
          {/* Search */}
          <Search className="text-white w-6 h-6" />

          {/* button Login LogOut - Register */}

          {session?.user ? (
            <>
              <p className="text-white font-bold text-sm">
                {session?.user?.email}
              </p>
              {session?.user?.role === "admin" && <AdminBtn />}
              <SignOutBtn />
            </>
          ) : (
            <>
              <p className="text-white font-bold text-sm">Guest</p>
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

          {/* button Cart */}
          <div className="flex gap-2 ">
            <div className="relative">
              <ShoppingBag className="text-white w-6 relative" />
              <div className=" bg-lime-300 absolute -top-1 -right-1 w-4 h-4 rounded-full flex justify-center items-center">
                <span className="rounded-full text-[12px] text-black font-bold font-[Outfit]">
                  0
                </span>
              </div>
            </div>

            <CircleUserRound className="text-white w-6 h-6" />
          </div>
        </div>
      </div>
      {/* Menu Bar */}
    </div>
  );
};
export default Navbar;
