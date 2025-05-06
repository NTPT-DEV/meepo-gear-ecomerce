'use client'
import { signOut } from "next-auth/react"

const SignOutBtn = () => {

  return (
    <button
      onClick={() => signOut()}
      className="bg-white w-[95px] h-[30px] rounded-full flex justify-center items-center cursor-pointer"
    >
      <span className="text-sm text-black italic font-semibold">Logout</span>
    </button>
  );
};
export default SignOutBtn;
