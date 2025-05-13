"use client";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SignInSchema } from "schemas/formSchemas";
import type { SignInTypeSchema } from "schemas/formSchemas";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import ButtonGoogle from "./ButtonGoogle";
import { loginAction } from "@/app/(main)/actions/auth/login";


const SigninForm = () => {

  const [loading, setLoding] = useState(false);
  const router = useRouter();
  

  

  const { register, handleSubmit, reset } = useForm<SignInTypeSchema>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInTypeSchema) => {
    setLoding(true);

    const response = await loginAction(data);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (response.success) {
      reset();
      router.push("/");

    } else {
      console.log("login fail");
    }

    setLoding(false);
  };

  return (
    <div className="container mx-auto w-screen h-fit  relative items-center py-10">
      <div className=" flex items-center justify-center">
        <div className="flex justify-center items-center bg-white backdrop-blur-[2px] w-[400px] h-auto rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 ">
          <div className="flex flex-col w-full p-7">
            <div className="flex flex-col w-full h-auto items-center gap-1 mb-5">
              <h1 className="text-3xl font-extrabold">LOGIN</h1>
              <h3 className="text-sm text-zinc-500">ลงชื้อเข้าใช้</h3>
            </div>

            {/* Login Form */}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full h-auto gap-y-4"
            >
              {/* email */}
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semi-bold">Email</h3>
                <input
                  {...register("email", {
                    required: "Email is required",
                  })}
                  className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg"
                  type="email"
                  placeholder="johnsnow@email.com"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semi-bold">Password</h3>
                <input
                  {...register("password")}
                  className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg"
                  type="password"
                  placeholder="********"
                />
              </div>

              {/* Forgot Password */}
              <div className="text-sm text-zinc-700 font-semibold my-2">
                Forgot password ?
              </div>

              {/* Button Login Credentials */}
              <button className="bg-zinc-800 text-white font-bold py-3 rounded-lg active:scale-95 transition-all duration-200">
                {loading ? (
                  <span className="flex justify-center items-center gap-2">
                    Loading...
                    <LoaderCircle className="w-5 h-5 text-white animate-spin" />
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>
            {/* Button Login google */}
            <ButtonGoogle />

            {/* Link to Register */}
            <div className="flex justify-center items-center text-xs my-5 text-zinc-700 hover:text-blue-800 transition-all duration-200">
              <Link href={"/auth/sign-up"}>
                <span>Don&apos;t have an account? Register here</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SigninForm;
