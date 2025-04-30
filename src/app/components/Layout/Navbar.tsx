import Link from "next/link";
import LogoMeepoGear from "../logoSvg/LogoMeepoGear";
import { CircleUserRound, Search, ShoppingBag } from "lucide-react";

const Navbar = () => {
  return (
    <div className="main-container">
      <div className="bg-black flex justify-between items-center w-full h-18 px-10">
        {/* Logo Main */}

        <Link href="/">
          <LogoMeepoGear className="text-white w-36 h-auto" />
        </Link>

        <div className="nav-con flex items-center gap-3">
          {/* Search */}
          <Search className="text-white w-6 h-6" />

          {/* button Login - Register */}
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

          {/* button Cart */}
          <div className="flex gap-2">
            <ShoppingBag className="text-white w-6 h-6" />
            <CircleUserRound className="text-white w-6 h-6" />
          </div>
        </div>
      </div>
      {/* Menu Bar */}

      
    </div>
  );
};
export default Navbar;
