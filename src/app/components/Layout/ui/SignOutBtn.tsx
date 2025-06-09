'use client'
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation";

const SignOutBtn = ({className} : {className?: string}) => {
  const router = useRouter();


  const handleSignOut = async() => { 
    await signOut({ redirect: false });
    alert('Logout successfuly !!')
    new Promise((resolve) => setTimeout(resolve, 1000));
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className={className}
    >
      <span className="text-sm text-lime-300 italic font-semibold">Logout</span>
    </button>
  );
};
export default SignOutBtn;
