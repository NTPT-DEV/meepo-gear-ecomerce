"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SignInSchema } from "schemas/formSchemas";
import type { SignInTypeSchema } from "schemas/formSchemas";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import ButtonGoogle from "./ui/ButtonGoogle";
import { loginAction } from "@/app/(main)/actions/auth/login";
import { motion , AnimatePresence} from "motion/react";
import { useSession } from "next-auth/react";


const SigninForm = () => {
  const router = useRouter();
  const { update } = useSession();
  const [loading, setLoding] = useState(false);
  const [loginState, setLoginState] = useState<string | null>(null);


  const { register, handleSubmit, reset , formState: { errors  } } = useForm<SignInTypeSchema>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const onSubmit = async (data: SignInTypeSchema) => {

    setLoding(true);
    setLoginState(null)

    const response = await loginAction(data);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    if(response?.success) { 
      // setLoginState(response.success)
       reset();
       await update()
       router.push("/")
     
    }

    if(response?.messageError) { 
      setLoginState(response.messageError)
    }

     
    setLoding(false);
  };

  return (
    <div className="container mx-auto w-screen h-fit  relative items-center py-10">
      <div className=" flex items-center justify-center">
        <motion.div 
        layout
        className="flex justify-center items-center bg-white backdrop-blur-[2px] w-[400px] h-auto rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 ">
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
              <AnimatePresence mode="wait">
              {loginState && (
                <motion.h1 
                layout
                key='error'
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay : 0.2 , ease : "easeInOut" }}
                className="bg-red-500 text-sm mx-auto font-bold w-full text-center py-[0.2rem] px-7 rounded-lg text-white">{loginState}
                </motion.h1>
              )}
           
              {errors.password?.message && (
                <motion.h1 
                key='passwordError'
                layout
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay : 0.2 , ease : "easeInOut" }}
                className="bg-red-500 text-[13px] mx-auto font-bold w-full text-center py-[0.5rem] px-7 rounded-lg text-white">{errors.password.message}
                </motion.h1>
              )}
              </AnimatePresence>
              
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
                  placeholder="******"
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
        </motion.div>
      </div>
    </div>
  );
};
export default SigninForm;
