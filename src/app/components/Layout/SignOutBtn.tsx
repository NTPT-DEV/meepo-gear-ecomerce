'use client'
import { signOut } from "next-auth/react"

const SignOutBtn = ({className} : {className?: string}) => {

  return (
    <button
      onClick={() => signOut()}
      className={className}
    >
      <span className="text-sm text-lime-300 italic font-semibold">Logout</span>
    </button>
  );
};
export default SignOutBtn;
