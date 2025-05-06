"use client"
import Link from "next/link";
import { CircleUserRound } from "lucide-react";
import LogoMeepoGear from "@/app/components/logoSvg/LogoMeepoGear";
import SignOutBtn from "@/app/components/Layout/SignOutBtn";
import { useSession } from "next-auth/react";

const NavbarDash = () => {

const { data:session } = useSession();

  return (
    <div className="main-container fixed top-0 left-0 z-50 w-full">
      <div className="bg-black flex justify-between items-center w-full h-18 px-10">
        {/* Logo Main */}

        <Link href="/">
          <LogoMeepoGear className="text-white w-36 h-auto" />
        </Link>

        <div className="nav-con flex items-center gap-3">

          {/* button Login Logout- Register */}
          { session?.user ? 
          (
            <>
              <p className="text-white font-bold text-sm">{session?.user?.email}</p>
              <SignOutBtn /> 
            </>
          ) 
          : 
          (
            <>
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
          <div className="flex gap-2">
            <CircleUserRound className="text-white w-6 h-6" />
          </div>
        </div>
      </div>
      {/* Menu Bar */}

      
    </div>
  );
};
export default NavbarDash;
