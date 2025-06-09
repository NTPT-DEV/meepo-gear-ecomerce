"use client";
import { FcGoogle } from "react-icons/fc";
import { useActionState } from "react";
import { googleAuth } from "@/app/(main)/actions/auth/google-login";


const ButtonGoogle = () => {
  const [errorMSGGoogle, dispatchGoogle] = useActionState(
    googleAuth,
    undefined
  );

  const handleGoogleLogin = async () => {
    try {
      dispatchGoogle();

      await googleAuth();
      console.log("Google login successful");
    } catch (error) {
      console.log("Google login failed", error);
    }
  };

  return (
    <form
      action={handleGoogleLogin}
      className="w-full flex justify-center items-center mt-2"
    >
      <button
        type="submit"
        className="bg-white flex w-full justify-center items-center gap-2 border border-zinc-200 text-sm text-zinc-800 font-bold py-3 rounded-lg active:scale-95 transition-all duration-200 "
      >
        <FcGoogle className="w-5 h-5" />
        Sign in with Google
      </button>
      <p>{errorMSGGoogle}</p>
    </form>
  );
};
export default ButtonGoogle;
